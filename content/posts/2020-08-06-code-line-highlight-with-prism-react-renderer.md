---
title: "Code line highlight with prism-react-renderer"
date: 2020-08-06
category: "Code"
thumbnail: "../thumbnails/squiggles.png"
tags:
  - code block
  - pre
  - prism-react-renderer
selected: "no"
---

As promised here I will try to explain how I have implemented syntax highlight using `prism-react-renderer` together with `theme-ui`.

We will do a couple of things:

- Create a `code.js` component that will inject the style into the `<pre>` tag
- Apply the created component to `gatsby-plugin-theme-ui`
- Create a `title.js` component to get the title of the file into the code block
- Build in the logic to highlight specific lines of code

# Building the code component

We can start with `prism-react-renderer` [documentation](https://www.npmjs.com/package/prism-react-renderer) to get a little bit more details on how to implement this.

To start with, let's create a `code.js` component as follows:

```jsx:title=src/components/code.js
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

const SyntaxHiglight = (props) => {
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.children.props.children.trim()}
      language="jsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const Code = (props) => <SyntaxHiglight {...props} />;

export default Code;
```

To make sure that this was working I had to apply the component into `theme-ui`

```jsx:title=src/gatsby-plugin-theme-ui/components.js
import React from "react";
import Code from "../components/code";

const components = {
  pre: (props) => <Code {...props} />,
};
export default components;
```

This is great and if you and you can now see your code block with a different styling, however this might not be the styling to that you want and more importantly the language is hardcoded and currently perceiving all `<pre>` tag's as jsx.

Let's change this.

```jsx:title=src/components/code.js {3,5-14,17,18,22,24}
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const getParams = (className = ``) => {
  const [lang = ``, params = ``] = className.split(`:`);
  return [lang.split(`language-`).pop().split(`{`).shift()].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`);
      merged[key] = value;
      return merged;
    }, {})
  );
};

const SyntaxHiglight = (props) => {
  const className = props.children.props.className || "";
  const [language, { title = `` }] = getParams(className);

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.children.props.children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              return (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        </>
      )}
    </Highlight>
  );
};

const Code = (props) => <SyntaxHiglight {...props} />;

export default Code;
```

We have added the theme and style that we wanted and now, with the `getParams` we will be able to extract the language and the title of the code block. Now if we add the language and title as follows ``jsx:title=src/components/code.js`, the function we created will capture the language as jsx and the tile of the code block as src/components/code.js.

# Create the title component

Now we can create the `title.js` component that will style and render the title and the language of the code block.

```jsx:title=src/components/title.js
/** @jsx jsx */
import { jsx } from "theme-ui";
import styled from "@emotion/styled";

const TitleContainer = styled.div`
  background-color: #d2c7ec;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.h2`
  margin: 0px;
  color: black;
`;

const LanguageTag = styled.div`
  padding: 5px;
  color: white;
  border-radius: 4px;
`;

const Title = (props) => {
  const { text, children, className } = props;
  return (
    <TitleContainer className={className}>
      <Text
        sx={{
          fontSize: [2, 3],
          fontFamily: `heading`,
          lineHeight: `heading`,
        }}
      >
        {text}
      </Text>
      <LanguageTag
        sx={{
          bg: `highlight`,
        }}
      >
        {children}
      </LanguageTag>
    </TitleContainer>
  );
};

export default Title;
```

Please note that I am using styled components with `emotion` on the title component.

Now we can use the title component in the code component that we have put together:

```jsx:title=src/components/code.js {4,20,31-33,34}
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import Title from "../components/title";

const getParams = (className = ``) => {
  const [lang = ``, params = ``] = className.split(`:`);
  return [lang.split(`language-`).pop().split(`{`).shift()].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`);
      merged[key] = value;
      return merged;
    }, {})
  );
};

const SyntaxHiglight = (props) => {
  const className = props.children.props.className || "";
  const [language, { title = `` }] = getParams(className);
  const ifTitle = (title || language) && { marginTop: `0px` };

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.children.props.children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <Title className="code-title" text={title}>
            {language}
          </Title>
          <pre className={className} style={{ ...style, ...ifTitle }}>
            {tokens.map((line, i) => {
              return (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        </>
      )}
    </Highlight>
  );
};

const Code = (props) => <SyntaxHiglight {...props} />;

export default Code;
```

We should be able to see the code block with the theme that we injected in the `<pre>` tag, however we are not done yet as we still want to get the feature for highlighting certain code lines.

# Highlight specific code lines

I reckon this super important piece to help anyone that is reading your digital garden to follow through when you are trying to explain anything with code.

We will be doing two very important and distinct things. In the first step **(a)** we will need to find a way to identify the lines of code to highlight and in the second step **(b)** we will need to determine and ingest the style on the line of code previously identified.

## Identifying the lines of code

```jsx:title=src/components/code.js {17-26,32,33,49-52}
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import Title from "../components/title";

const getParams = (className = ``) => {
  const [lang = ``, params = ``] = className.split(`:`);
  return [lang.split(`language-`).pop().split(`{`).shift()].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`);
      merged[key] = value;
      return merged;
    }, {})
  );
};

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (i) => lineNumbers.includes(i + 1);
  } else {
    return () => false;
  }
};

const SyntaxHiglight = (props) => {
  const className = props.children.props.className || "";
  const [language, { title = `` }] = getParams(className);
  const ifTitle = (title || language) && { marginTop: `0px` };
  const metastring = props.children.props.metastring || ""
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.children.props.children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <Title className="code-title" text={title}>
            {language}
          </Title>
          <pre className={className} style={{ ...style, ...ifTitle }}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`;
              }
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        </>
      )}
    </Highlight>
  );
};

const Code = (props) => <SyntaxHiglight {...props} />;

export default Code;
```
We manage to get create a way to identify the lines of code that we would like to highlight if before the code block we input the following: ````jsx:title=src/components/code.js {17-26,32,33,49-52}`. We are now passing a `metastring` prop with `{17-26,32,33,49-52}` that results in the injection of a new class into the `<div>` tag. 

The only thing that we now need to do is to style that newly created class.

```css:title=src/css/code.css
.highlight-line {
  background-color: rgb(53, 59, 69);
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.1em solid #d23669;
}
```

Here we used a normal css file so that we can check the difference in styling when using a different language. 

Please note that we still need to import the newly created style to the `code.js` component. 

```jsx:title=src/components/code.js {5}
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import Title from "../components/title";
import '../css/code.css'
...
```

That is it! Now we have a way to style our code block `<pre>` tag as we want as well as an effective implementation to highlight the code lines that we want whenever needed. 

Last but not the least I would like you to leave you with 2 great resources that really helped me out to achieve this: 
1. Building Websites with MDX and Gatsby, by Chris Biscardi -> [link](https://egghead.io/playlists/building-websites-with-mdx-and-gatsby-161e9529)
2. Add line highlighting to prism-react-renderer -> [link](https://prince.dev/highlight-with-react)

Thanks for reading. 

If this was useful for you just hit the like button bellow.



---
title: "react-live, the playground you need for your blog"
date: 2020-10-18
category: "Code"
thumbnail: "../thumbnails/react-live.png"
tags:
  - react-live
  - playground
  - coding
selected: "no"
---

Here I will integrate and style `react-live` together with `prism-react-renderer` and `theme-ui`. I have integrated `react-live` before, but the styling that I was using was terrible and as a result, I never used it.

In a way this post is a continuation of my first post about `prism-react-renderer` that you can check [here](/blog/2020-08-06-code-line-highlight-with-prism-react-renderer).

# Changing my code component

We need to make a couple of changes on the `code` component and as a first step we will need to install and set up `react-live`. After that, I will bring the `theme-ui` hook to get the `pre` tag styling that we had defined before and for pass that style to the `LiveEditor` component.

Because I also want to differentiate my `LivePreview` component, I will give it the styling I want.

```jsx:title=src/components/code.js {1-3,22-25,29-31,32,35-41}
/** @jsx jsx */
import { useThemeUI, jsx } from "theme-ui";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";
import Highlight, { defaultProps } from "prism-react-renderer";
import rangeParser from "parse-numeric-range";
import Title from "../components/title";
import "../css/code.css";

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

const LiveCode = (props) => {
  const context = useThemeUI();
  const preStyle = context.theme.styles.root.pre;
  const className = props.children.props.className || "";
  const [language, { title = `` }] = getParams(className);

  return (
    <LiveProvider code={props.children.props.children.trim()} theme={theme}>
      <Title className="code-title" text={title}>
        {language}
      </Title>
      <LiveEditor style={preStyle} />
      <LiveError />
      <LivePreview
        sx={{
          bg: `hover`,
          p: 3,
          border: `1px solid`,
          borderColor: `highlight`,
          mt: 3,
        }}
      />
    </LiveProvider>
  );
};
```

Now that we have the `LiveCode` component defined, we will need to change what we would return depending on the prop that we will be passing on our markdown file. It makes sense to pass `react-live` as a prop in the our markdown to render the `LiveCode`.

As a result we will need to implement the following.

```jsx:title=src/components/code.js
...
const Code = (props) => {
  if (props.children.props["react-live"]) {
    return <LiveCode {...props} />;
  } else {
    return <SyntaxHiglight {...props} />;
  }
};

export default Code;
...
```

# The playground is ready

```jsx:title=PLAYGROUND react-live
class Counter extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((state) => ({ count: state.count + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <center>
        <h3>{this.state.count}</h3>
      </center>
    );
  }
}
```

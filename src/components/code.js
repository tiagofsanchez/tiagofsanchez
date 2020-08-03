import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";
import Highlight, { defaultProps } from "prism-react-renderer";
import Title from "../components/title";

const LiveCode = (props) => {
  return (
    <LiveProvider code={props.children.props.children.trim()} theme={theme}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};

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
          <div className="gatsby-highlight" data-language={language}>
            <pre className={className} style={{ ...style, ...ifTitle }}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        </>
      )}
    </Highlight>
  );
};

const Code = (props) => {
  console.log(props);
  if (props.children.props["react-live"]) {
    return <LiveCode {...props} />;
  } else {
    return <SyntaxHiglight {...props} />;
  }
};

export default Code;

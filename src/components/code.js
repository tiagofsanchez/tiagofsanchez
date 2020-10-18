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
  const metastring = props.children.props.metastring || "";
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.children.props.children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div>
          <Title className="code-title" text={title}>
            {language}
          </Title>
          <div className="gatsby-highlight" data-language={language}>
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
          </div>
        </div>
      )}
    </Highlight>
  );
};

const Code = (props) => {
  if (props.children.props["react-live"]) {
    return <LiveCode {...props} />;
  } else {
    return <SyntaxHiglight {...props} />;
  }
};

export default Code;

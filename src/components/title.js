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

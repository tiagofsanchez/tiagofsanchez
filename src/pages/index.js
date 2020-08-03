/** @jsx jsx */
import { jsx } from "theme-ui";
import ThemeIndex from "gatsby-theme-tfs/src/pages/index";
import Form from "../components/form";
import styled from "@emotion/styled";

const GridContainer = styled.div`
  display: grid;
  grid-gap: 70px;
`;

const Index = () => { 
  return (
    <GridContainer>
      <ThemeIndex />
      <div sx={{ variant: `layout.container` }}>
        <Form />
      </div>
    </GridContainer>
  );
};

export default Index;

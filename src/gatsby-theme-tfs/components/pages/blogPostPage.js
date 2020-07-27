/** @jsx jsx */
import { jsx } from "theme-ui";
import ThemeBlogPostPage from "gatsby-theme-tfs/src/components/pages/blogPostPage";
import Form from "../../../components/form";
import styled from "@emotion/styled";

const GridContainer = styled.div`
  display: grid;
  grid-gap: 70px;
`;

const BlogPostPage = (props) => {
  return (
    <GridContainer>
      <ThemeBlogPostPage {...props} />
      <div sx={{ variant: `layout.container` }}>
        <h1 sx={{textAlign: `center`}}>Subscribe</h1>
        <Form />
      </div>
    </GridContainer>
  );
};

export default BlogPostPage;

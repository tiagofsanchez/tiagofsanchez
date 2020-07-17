import { useStaticQuery, graphql } from "gatsby";

export const useDiogoPhoto = () => {
  const data = useStaticQuery(
    graphql`
      {
        file(
          sourceInstanceName: { eq: "content/images" }
          name: { eq: "diogo" }
          relativeDirectory: { eq: "us" }
        ) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );
  return data.file.childImageSharp.fluid; 
};

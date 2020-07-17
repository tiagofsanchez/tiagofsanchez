import { useStaticQuery, graphql } from "gatsby";

export const useMonicaPhoto = () => {
  const data = useStaticQuery(
    graphql`
      {
        file(
          sourceInstanceName: { eq: "content/images" }
          name: { eq: "monica" }
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

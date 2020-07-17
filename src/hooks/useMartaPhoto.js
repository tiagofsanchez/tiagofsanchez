import { useStaticQuery, graphql } from "gatsby";

export const useMartaPhoto = () => {
  const data = useStaticQuery(
    graphql`
      {
        file(
          sourceInstanceName: { eq: "content/images" }
          name: { eq: "marta" }
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

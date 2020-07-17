import { useStaticQuery, graphql } from "gatsby";

export const useMePhoto = () => {
  const data = useStaticQuery(
    graphql`
      {
        file(
          sourceInstanceName: { eq: "content/images" }
          name: { eq: "meAvatar" }
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

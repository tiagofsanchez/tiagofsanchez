import { useStaticQuery, graphql } from "gatsby";

export const useOurPhotos = () => {
  const data = useStaticQuery(
    graphql`
      {
        diogo: file(
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
        monica: file(
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
        me: file(
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
        marta: file(
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
  const diogo = data.diogo.childImageSharp.fluid;
  const monica = data.monica.childImageSharp.fluid;
  const me = data.me.childImageSharp.fluid;
  const marta = data.marta.childImageSharp.fluid;
  return { diogo, monica, marta, me };
};

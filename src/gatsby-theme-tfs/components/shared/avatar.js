import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ImageWrapper = styled.div`
  width: ${(props) => props.width};
  border-radius: 50%;
`;

const Avatar = ({ width }) => {
  const data = useStaticQuery(graphql`
    {
      logo: file(
        sourceInstanceName: { eq: "content/images" }
        relativeDirectory: { eq: "us" }
        name: { eq: "me" }
      ) {
        childrenCloudinaryAsset {
          fluid(transformations: ["ar_1:1", "c_thumb", "g_face"]) {
            ...CloudinaryAssetFluid
          }
        }
      }
    }
  `);
 
  return data.logo !== null ? (
    <ImageWrapper width={width}>
      <Img fluid={data.logo.childrenCloudinaryAsset[0].fluid} style={{borderRadius: `50%`}}/>
    </ImageWrapper>
  ) : null;
};

Avatar.propTypes = {
  width: PropTypes.string,
};

export default Avatar;

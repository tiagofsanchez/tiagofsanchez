import React from "react";
import { useOurPhotos } from '../../../hooks/useOurPhotos'
import Img from "gatsby-image";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ImageWrapper = styled.div`
  width: ${(props) => props.width};
  border-radius: 50%;
`;

const Avatar = ({ width }) => {
  const { me } = useOurPhotos()
  return me !== null ? (
    <ImageWrapper width={width}>
      <Img
        fluid={me}
        style={{ borderRadius: `50%` }}
      />
    </ImageWrapper>
  ) : null;
};

Avatar.propTypes = {
  width: PropTypes.string,
};

export default Avatar;

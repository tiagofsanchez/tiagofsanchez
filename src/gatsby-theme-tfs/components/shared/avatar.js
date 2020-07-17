import React from "react";
import { useMePhoto } from '../../../hooks/useMePhoto'
import Img from "gatsby-image";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ImageWrapper = styled.div`
  width: ${(props) => props.width};
  border-radius: 50%;
`;

const Avatar = ({ width }) => {
  const avatar = useMePhoto()
  return avatar !== null ? (
    <ImageWrapper width={width}>
      <Img
        fluid={avatar}
        style={{ borderRadius: `50%` }}
      />
    </ImageWrapper>
  ) : null;
};

Avatar.propTypes = {
  width: PropTypes.string,
};

export default Avatar;

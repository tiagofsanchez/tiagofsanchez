/** @jsx jsx */import React from 'react';
import { jsx } from "theme-ui";
import { useState } from "react";
import styled from "@emotion/styled";
import useSound from "use-sound";

import toggleSound from "gatsby-theme-tfs/src/components/sounds/toggle.mp3";

const ToogleContainer = styled.div`
  width: 48px;
  height: 25px;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;

const Toogle = styled.div`
  width: 20px;
  height: 20px;
  transform: ${(props) =>
    props.mode === true ? "translateX(0px)" : "translateX(16px)"};
  transition: transform 100ms ease-out;
  margin: auto 5px;
  border-radius: 50%;
`;

const Toggle = () => {
  const [play] = useSound(toggleSound);
  const [mode, setMode] = useState(true);

  const soundHandler = () => {
    play();
    setMode(!mode);
  };

  return (
    <ToogleContainer sx={{ bg: `primary` }} onClick={soundHandler}>
      <Toogle sx={{ bg: `background` }} mode={mode} />
    </ToogleContainer>
  );
};

export default Toggle;

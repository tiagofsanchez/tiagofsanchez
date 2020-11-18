/** @jsx jsx */
import { jsx } from "theme-ui";
import { useState } from "react";
import styled from "@emotion/styled";
import useSound from "use-sound";

import heart from "../../logos/heart.svg";
import soundUrl from "../../sounds/sent.mp3";

const ImgContainer = styled.img`
  width: auto;
  padding: 10px;
  border-radius: 50%;
`;

const Button = styled.button`
  display: contents;
  cursor: pointer;
`;

const LikeButton = () => {
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [play] = useSound(soundUrl, {
    playbackRate,
    volume: 0.5,
  });

  const soundHandler = () => {
    setPlaybackRate(playbackRate + 0.1);
    play();
  };

  return (
    <Button onClick={soundHandler}>
      <ImgContainer
        src={heart}
        alt="Tap if you like the post"
        sx={{ bg: `hover` }}
      />
    </Button>
  );
};

export default LikeButton;

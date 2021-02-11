/** @jsx jsx */
import { jsx } from "theme-ui";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import useSound from "use-sound";

import { addLikesToDB, gedLikesFromDB } from "../utils/api";
import heart from "../logos/heart.svg";
import soundUrl from "gatsby-theme-tfs/src/components/sounds/sent.mp3";

const LikeContainer = styled.div`
  display: grid;
  justify-content: end;
  justify-items: center;
  position: sticky;
  bottom: 30px;
`;

const ImgContainer = styled.img`
  width: auto;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 1px 2px 10px rgba(82, 21, 41, 0.5);
  &:hover {
    box-shadow: 1px 2px 10px rgba(82, 21, 41, 3);
  }
`;

const NumLikes = styled.p`
  border-radius: 5px;
  margin-bottom: 5px;
  font-weight: bold;
  padding: 5px;
  box-shadow: 1px 1px 5px rgba(82, 21, 41, 0.2);
`;

const Button = styled.button`
  display: contents;
  cursor: pointer;
`;

const Palmas = ({ title }) => {
  const [likes, setLikes] = useState("");
  const [id, setId] = useState("");
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0.75);

  const [play] = useSound(soundUrl, {
    playbackRate,
    volume: 0.5,
  });

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y < -700;
      if (isShow !== hideOnScroll) {
        return setHideOnScroll(isShow);
      }
    },
    [hideOnScroll]
  );

  useEffect(() => {
    gedLikesFromDB(title, setId, setLikes);
  }, [title]);

  const addLikes = () => {
    addLikesToDB(id, likes, title, setLikes, setId);
    setPlaybackRate(playbackRate + 0.1);
    play();
  };

  return (
    hideOnScroll && (
      <LikeContainer sx={{ variant: `layout.blogHeader` }}>
        <NumLikes sx={{ color: `highlight`, bg: `hover` }}>{likes}</NumLikes>
        <Button onClick={addLikes}>
          <ImgContainer
            src={heart}
            alt="Tap if you like the post"
            sx={{ bg: `hover` }}
          />
        </Button>
      </LikeContainer>
    )
  );
};

export default Palmas;

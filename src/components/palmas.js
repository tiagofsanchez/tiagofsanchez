import { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";
import styled from "@emotion/styled";

import { addLikesToDB, gedLikesFromDB } from "../utils/api";
import heart from "../logos/heart.svg";

const LikeContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  justify-items: start;
  margin: auto;
  grid-gap: 15px;
`;

const Button = styled.button`
  display: contents;
  cursor: pointer;
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

const Palmas = ({ title }) => {
  const [likes, setLikes] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    gedLikesFromDB(title, setId, setLikes);
  }, [title]);

  const addLikes = () => {
    addLikesToDB(id, likes, title, setLikes, setId);
  };

  return (
    <LikeContainer>
      <Button onClick={addLikes}>
        <ImgContainer src={heart} alt="Tap if you like the post" sx={{bg:`hover`}}/>
      </Button>
      {likes ? (
        <p sx={{ textAlign: `center` }}>
          <span sx={{ color: `highlight` }}>{likes}</span> readers liked!
        </p>
      ) : (
        <p>Be the first one to like</p>
      )}
    </LikeContainer>
  );
};

export default Palmas;

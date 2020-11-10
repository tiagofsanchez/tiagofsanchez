/** @jsx jsx */
import { jsx } from "theme-ui";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { addLikesToDB, gedLikesFromDB } from "../utils/api";
import heart from "../logos/heart.svg";

const LikeContainer = styled.div`
  display: grid;
  justify-content: end;
  justify-items: center;
  position: sticky;
  bottom: 80px;
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

  useEffect(() => {
    gedLikesFromDB(title, setId, setLikes);
  }, [title]);

  const addLikes = () => {
    addLikesToDB(id, likes, title, setLikes, setId);
  };

  return (
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
  );
};

export default Palmas;

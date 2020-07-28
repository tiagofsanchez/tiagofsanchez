import { useState, useEffect } from "react";
import axios from "axios";
/** @jsx jsx */
import { jsx } from "theme-ui";
import styled from "@emotion/styled";

import smile from "../logos/smile.svg";

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
  const url = "https://blog-likes.firebaseio.com/likes.json";
  useEffect(() => {
    axios.get(url).then((resp) => {
      const allLikes = resp.data;
      console.log(allLikes);
      allLikes &&
        Object.keys(allLikes).map((ingKey) => {
          if (allLikes[ingKey].title === title) {
            setId(ingKey);
            setLikes(allLikes[ingKey].likes);
          }
        });
    });
  }, []);

  const addLikes = () => {
    if (id === "" && likes === "") {
      const newLikes = Number(likes) + 1;
      axios
        .post(url, {
          title: title,
          likes: newLikes,
        })
        .then((resp) => {
          setLikes(newLikes);
          setId(resp.data.name);
        });
    } else {
      axios
        .put(
          `https://blog-likes.firebaseio.com/likes/${id}/likes.json`,
          Number(likes) + 1
        )
        .then(() => setLikes(Number(likes) + 1));
    }
  };

  return (
    <LikeContainer>
      <Button onClick={addLikes}>
        <ImgContainer src={smile} alt="Tap if you like the post" />
      </Button>
      <p sx={{ textAlign: `center` }}>
        <span sx={{ color: `highlight` }}>{likes}</span> readers liked!
      </p>
    </LikeContainer>
  );
};

export default Palmas;

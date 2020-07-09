import { useState } from "react";
/** @jsx jsx */
import { jsx, Input, Button } from "theme-ui";
import styled from "@emotion/styled";
import axios from "axios";
import { FormHero } from "gatsby-theme-tfs/src/components/shared/hero";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;

const HeroContainer = styled.div`
  padding: 40px;
  display: grid;
  place-items: center;
`;

const FormContainer = styled.form`
  padding: 40px;
  border-radius: 4px;
`;

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onFormSubmithandler = (e) => {
    e.preventDefault();

    //axios
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://api.convertkit.com/v3/forms/1515689/subscribe`;
    const data = {
      api_key: ``,
      email: email,
      first_name: name,
    };

    axios
      .post(url, data, axiosConfig)
      .then((resp) => {
        console.log(resp);
        setName("");
        setEmail("");
      })
      .catch((error) => console.log(error));
  };

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
  };

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  let isDisabled = true;
  if (name !== "" && email !== "") {
    isDisabled = false;
  }

  console.group();
  console.log(`NAME: ${name}`);
  console.log(`EMAIL: ${email}`);
  console.log(`ISDISABLED:${isDisabled}`);

  console.groupEnd();

  return (
    <Container>
      <HeroContainer>
        <FormHero blurb="My simple and short newsletter" />
      </HeroContainer>
      <FormContainer sx={{ bg: `hover` }} onSubmit={onFormSubmithandler}>
        <Input
          value={name}
          type="text"
          onChange={onChangeNameHandler}
          placeholder="your name"
        />
        <Input
          value={email}
          type="email"
          onChange={onChangeEmailHandler}
          placeholder="your email"
        />
        <Button disabled={isDisabled} sx={{}}>
          Subscribe
        </Button>
        <p sx={{ my: `5px`, fontSize: `16px` }}>No spam! Only good stuff</p>
      </FormContainer>
    </Container>
  );
};

export default Form;

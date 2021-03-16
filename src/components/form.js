/** @jsx jsx */
import { jsx, Input, Button } from "theme-ui";
import styled from "@emotion/styled";
import { addEmailToAirtable, addEmailToConvertKit } from "../utils/api";
import { useState } from "react";
import { navigate } from "gatsby";

const Container = styled.div`
  padding: 30px;
  border: 1px solid;
  border-radius: 9px;
  p {
    margin-top: 0;
  }
  h1,
  p {
    margin-bottom: 0;
    text-align: center;
  }
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

const FormContainer = styled.form`
  padding: 40px;
`;

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onFormSubmithandler = (e) => {
    e.preventDefault();
    addEmailToAirtable(name, email);
    addEmailToConvertKit(name, email);
    setName("");
    setEmail("");
    navigate("/success");
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

  console.log(isDisabled)
  return (
    <Container sx={{ bg: `hover` }}>
      <h1>Subscribe</h1>
      <p>No spam! Only good stuff!</p>
      <FormContainer onSubmit={onFormSubmithandler}>
        <fieldset>
          <Input
            value={name}
            type="text"
            onChange={onChangeNameHandler}
            placeholder="your name"
            aria-label="Input your name"
            sx={{borderColor: `primary`}}
          />
          <Input
            value={email}
            type="email"
            onChange={onChangeEmailHandler}
            placeholder="your email"
            aria-label="Input your email"
            sx={{borderColor: `primary`}}
          />
          <Button
            disabled={isDisabled}
            aria-label="Subscribe to the newsletter"
          >
            Subscribe
          </Button>
        </fieldset>
      </FormContainer>
    </Container>
  );
};

export default Form;

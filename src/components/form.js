import { useState } from "react";
/** @jsx jsx */
import { jsx, Input, Button } from "theme-ui";
import styled from "@emotion/styled";
import { FormHero } from "gatsby-theme-tfs/src/components/shared/hero";
import { addEmailToAirtable } from "../utils/api";

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
  const [isSubscribed, setIsSubscribed] = useState(false)

  const onFormSubmithandler = (e) => {
    e.preventDefault();
    addEmailToAirtable(name, email);
    setName("");
    setEmail("");
    setIsSubscribed(true)
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

  const heroBlurb = isSubscribed ? "THANK YOU 🙏" : "Crafted content about tech, startups and more!" 

  return (
    <Container>
      <HeroContainer>
        <div sx={{ textAlign: `center` }}>
          <FormHero blurb={heroBlurb} />
        </div>
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
        <Button disabled={isDisabled}>Subscribe</Button>
        <p sx={{ my: `5px`, fontSize: `16px` }}>No spam! Only good stuff</p>
      </FormContainer>
    </Container>
  );
};

export default Form;

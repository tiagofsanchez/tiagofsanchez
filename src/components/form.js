/** @jsx jsx */
import { jsx, Input, Button } from "theme-ui";
import styled from "@emotion/styled";
import { FormHero } from "gatsby-theme-tfs/src/components/shared/hero";
import { addEmailToAirtable, addEmailToConvertKit } from "../utils/api";
import { useState } from "react";
import { navigate } from "gatsby";

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
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onFormSubmithandler = (e) => {
    e.preventDefault();
    addEmailToAirtable(name, email);
    addEmailToConvertKit(name, email);
    setName("");
    setEmail("");
    setIsSubscribed(true);
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

  const heroBlurb = isSubscribed
    ? "🙏, check your email to confirm the subscription!"
    : "Crafted content about tech, startups and more!";

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
          aria-label="Input your name"
        />
        <Input
          value={email}
          type="email"
          onChange={onChangeEmailHandler}
          placeholder="your email"
          aria-label="Input your email"
        />
        <Button disabled={isDisabled} aria-label="Subscribe to the newsletter">
          Subscribe
        </Button>
        <p sx={{ my: `5px`, fontSize: `16px` }}>No spam! Only good stuff</p>
      </FormContainer>
    </Container>
  );
};

export default Form;

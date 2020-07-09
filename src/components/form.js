/** @jsx jsx */
import { jsx, Input, Button } from "theme-ui";
import styled from "@emotion/styled";
import {FormHero} from 'gatsby-theme-tfs/src/components/shared/hero'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  box-shadow:1px 2px 10px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;

const HeroContainer = styled.div`
padding: 40px;
display: grid; 
place-items: center;
`

const FormContainer = styled.form`
  padding: 40px;
  border-radius: 4px;
`;

const Form = () => {
  return (
    <Container>
      <HeroContainer>
        <FormHero blurb="My simple and short newsletter" />
      </HeroContainer>
      <FormContainer sx={{bg: `hover`}}>
        <Input placeholder="your name" />
        <Input placeholder="your email" />
        <Button>Subscribe</Button>
        <p sx={{ my: `5px`, fontSize: `16px` }}>No spam! Only good stuff</p>
      </FormContainer>
    </Container>
  );
};

export default Form;

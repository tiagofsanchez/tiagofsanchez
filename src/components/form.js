/** @jsx jsx */
import { jsx, Input, Button } from "theme-ui";
import styled from "@emotion/styled";
import { addEmailToAirtable, addEmailToConvertKit } from "../utils/api";
import { navigate } from "gatsby";
import useFormInput from "../hooks/useFormInput";

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
  padding: 20px;
`;

const Form = () => {
  const { inputs, onChange, resetForm } = useFormInput({ 
    name: '', 
    email: ''
  })

  const onFormSubmithandler = (e) => {
    e.preventDefault();
    addEmailToAirtable({...inputs});
    addEmailToConvertKit({...inputs});
    resetForm()
    navigate("/success");
  };

  const { name , email } = inputs
  let isDisabled = true;
  if (name !== "" && email !== "") {
    isDisabled = false;
  }

  return (
    <Container sx={{ bg: `hover` }}>
      <h1>Subscribe</h1>
      <p>No spam! Only good stuff!</p>
      <FormContainer onSubmit={onFormSubmithandler}>
        <fieldset>
          <Input
            value={name}
            name='name'
            type="text"
            onChange={onChange}
            placeholder="your name"
            aria-label="Input your name"
            sx={{borderColor: `primary`}}
          />
          <Input
            value={email}
            name='email'
            type="email"
            onChange={onChange}
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

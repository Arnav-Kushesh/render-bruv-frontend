import styled from "styled-components";
import MaterialInput from "../../../helperComponents/MaterialInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 30vw;
  z-index: 555;

  @media (max-width: 900px) {
    width: 90%;
    gap: 30px;
  }
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30vw;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Button = styled.button`
  padding: 15px 20px;
  background: var(--gradientSurface);
  color: var(--mainBackground);
  border-radius: 10px;
  text-decoration: none;
  border: none;
  outline: none;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 13px;
  /* transition: 0.1s ease-in all; */
  cursor: pointer;

  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(0.95);
  }
`;

const Description = styled.div`
  opacity: 0.7;
  font-size: 18px;
`;

export default function ContactForm() {
  return (
    <Container>
      <ContainerText>
        <Description>Contact Us</Description>
      </ContainerText>

      <Form action="https://formspree.io/f/xpwarjwk" method="POST">
        <MaterialInput
          label={"Your Email"}
          variant="filled"
          // placeholder={"Type your email here"}
          type="email"
          name="email"
        />
        <MaterialInput
          label={"Message"}
          multiline={true}
          rows={4}
          // label="Type your message here."
          name="message"
        />
        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
}

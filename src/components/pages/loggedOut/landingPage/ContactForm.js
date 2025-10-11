import styled from "styled-components";
import MaterialInput from "../../../helperComponents/MaterialInput";
import PrimaryButton from "../../../helperComponents/PrimaryButton";
import { MdAlternateEmail, MdEmail } from "react-icons/md";
import CustomButton from "../../../helperComponents/CustomButton";
import { BiSend } from "react-icons/bi";

let baseColor = "rgba(144, 132, 249, 0.2)";
let solidColor = "rgb(104, 91, 220)";
let solidColorMain = "rgb(104, 91, 220)";

baseColor = "rgba(132, 161, 249, 0.1)";
solidColor = "rgba(91, 98, 220, 0.21)";
solidColorMain = "rgba(76, 86, 227, 1)";

const Container = styled.div`
  padding: 50px;
  width: 700px;
  height: 700px;

  display: flex;
  border-radius: 26px;
  flex-direction: column;
  gap: 20px;

  box-shadow: 0 2px 0 0 #1c79dd2a;
  background: linear-gradient(154deg, #3a22ac29, #1f6dea29, #2b06ba8c);
  background: #214b782a;
  border: 1px solid #1c79dd2a;
  box-shadow: none;
  transition: 0.25s ease-in-out;
  background: ${baseColor};
  border: 1px solid ${solidColor};
  /* border: none; */
  /* box-shadow: none; */
  /* background: none; */

  @media (max-width: 900px) {
    width: 90%;
    gap: 30px;
  }
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  /* width: 30vw; */

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  font-size: 19px;
  font-weight: 600;
  font-family: "Montserrat", serif;
  color: #01010fff;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: ${solidColorMain};
`;

export default function ContactForm() {
  return (
    <Container>
      <ContainerText>
        <Icon>
          <MdAlternateEmail />
        </Icon>
        <Description>Send us an email</Description>
      </ContainerText>

      <Form action="https://formspree.io/f/xpwarjwk" method="POST">
        <MaterialInput
          label={"Your Email"}
          variant="filled"
          type="email"
          name="email"
          surfaceColor={baseColor}
          borderColor={solidColor}
        />
        <MaterialInput
          label={"Message"}
          multiline={true}
          rows={12}
          name="message"
          surfaceColor={baseColor}
          borderColor={solidColor}
        />
        <CustomButton
          icon={<BiSend />}
          textStyle={{ color: solidColorMain }}
          iconStyle={{ color: solidColorMain }}
          style={{
            background: "transparent",
            border: `1px solid ${solidColor}`,
            boxShadow: "unset",
            width: "170px",
            height: "50px",
          }}
          type="submit"
        >
          Send
        </CustomButton>
      </Form>
    </Container>
  );
}

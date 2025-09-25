import CustomButton from "../../helperComponents/CustomButton";
import { styled } from "styled-components";
import goTo from "../../../controllers/goTo";
import { serverLine } from "../../../controllers/serverLine";
import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import BrandContainer from "../../brand/BrandContainer";
import LoadingSection from "../../helperComponents/LoadingSection";
import BrandContainerThemed2d from "../../brand/BrandContainerThemed2d";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding-top: 150px;
`;
const Title = styled.h1``;
const SubTitle = styled.div`
  opacity: 0.5;
  margin-top: -5px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  align-items: center;
  padding: 50px;
  background-color: var(--surface2);
`;

const Icon = styled.div`
  font-size: 30px;
`;

export default function CheckStripePaymentSuccess() {
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    serverLine
      .get("/check-stripe-payment-success")
      .then(() => {
        setPaymentVerified(true);
      })
      .catch((newError) => {
        console.log(newError.message);
        setError(newError.message);
      });
  }, []);

  if (error) {
    return (
      <Container>
        <BrandContainerThemed2d />

        <Main>
          <Title>{JSON.stringify(error)}</Title>
          <CustomButton
            onClick={goTo(window.homeLink, {
              isAbsolute: true,
              openInSamePage: true,
            })}
            customVariant="slightlyContained"
          >
            Go To Home
          </CustomButton>
        </Main>
      </Container>
    );
  }

  if (paymentVerified) {
    return (
      <Container>
        <BrandContainerThemed2d />

        <Main style={{ color: "lightGreen" }}>
          <Icon>
            <AiOutlineCheck />
          </Icon>
          <Title>Payment Verified!</Title>
          <CustomButton
            style={{ color: "lightGreen" }}
            onClick={goTo(window.homeLink, {
              isAbsolute: true,
              openInSamePage: true,
            })}
            customVariant="slightlyContained"
          >
            Go To Home
          </CustomButton>
        </Main>
      </Container>
    );
  }

  return (
    <Container>
      <Main>
        <Title>Verifying Payment</Title>
        <SubTitle>Please wait</SubTitle>
        <LoadingSection />
      </Main>
    </Container>
  );
}

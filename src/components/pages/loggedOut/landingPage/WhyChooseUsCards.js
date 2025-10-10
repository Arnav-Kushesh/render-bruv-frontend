import React from "react";
import styled, { keyframes } from "styled-components";

const InfoSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  flex: 1;
  padding-left: 10vw;
  padding-right: 2vw;
  gap: 20px;
  @media (max-width: 900px) {
    gap: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 100%;
`;

const InfoBox = styled.div`
  /* border: 1px solid #99999943; */
  padding: 35px;
  height: 300px;
  /* margin: auto; */
  width: 100%;
  display: flex;
  border-radius: 26px;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(
    125deg,
    #0096ffd6,
    2%,
    rgba(17, 176, 255, 0.1),
    rgba(17, 176, 255, 0)
  );
  box-shadow: 0 2px 0 0 #1c79dd2a;
  background: linear-gradient(
    125deg,
    rgba(17, 176, 255, 0.1),
    2%,
    rgba(17, 176, 255, 0.1),
    rgba(17, 176, 255, 0)
  );
  /* background: linear-gradient(197deg, #0883fd8b, 20%, #11b1ff00); */

  transition: 0.25s ease-in-out;

  &:hover {
    /* background: linear-gradient(125deg, #0883fd, #11b1ff00); */
    /* background: linear-gradient(197deg, #0883fd, #11b1ff00); */
  }
`;

const squashStretch = keyframes`
  0% {
    transform: scaleX(1) scaleY(1);
  }
  20% {
    transform: scaleX(1.2) scaleY(0.8); /* squash */
  }
  40% {
    transform: scaleX(0.8) scaleY(1.2); /* stretch */
  }
  60% {
    transform: scaleX(1.1) scaleY(0.9); /* minor squash */
  }
  80% {
    transform: scaleX(0.9) scaleY(1.1); /* minor stretch */
  }
  100% {
    transform: scaleX(1) scaleY(1); /* back to normal */
  }
`;

const float = keyframes`
  0% {
    transform: translate(0px, 0px) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(10px, -10px) rotate(2deg) scale(1.02);
  }
  50% {
    transform: translate(-10px, 10px) rotate(-2deg) scale(0.98);
  }
  75% {
    transform: translate(5px, -5px) rotate(1deg) scale(1.01);
  }
  100% {
    transform: translate(0px, 0px) rotate(0deg) scale(1);
  }
`;

const floatRandom = keyframes`
  0% {
    transform: translate(0px, 0px) rotate(0deg) scale(1);
  }
  10% {
    transform: translate(5px, -8px) rotate(1deg) scale(1.01);
  }
  20% {
    transform: translate(-6px, 4px) rotate(-1.5deg) scale(0.99);
  }
  30% {
    transform: translate(8px, 6px) rotate(0.5deg) scale(1.02);
  }
  40% {
    transform: translate(-4px, -7px) rotate(-0.8deg) scale(0.98);
  }
  50% {
    transform: translate(7px, 3px) rotate(1.2deg) scale(1.01);
  }
  60% {
    transform: translate(-5px, -5px) rotate(-1deg) scale(0.99);
  }
  70% {
    transform: translate(6px, 4px) rotate(0.7deg) scale(1.02);
  }
  80% {
    transform: translate(-3px, -6px) rotate(-0.5deg) scale(0.98);
  }
  90% {
    transform: translate(4px, 5px) rotate(0.8deg) scale(1.01);
  }
  100% {
    transform: translate(0px, 0px) rotate(0deg) scale(1);
  }
`;

const InfoImage = styled.img`
  height: 100px;
  width: 100px;
  object-fit: contain;
  filter: saturate(1.5) contrast(1.3) hue-rotate(25deg) brightness(0.99)
    drop-shadow(0 2px 20px #1c79dd64);
  animation: ${floatRandom} 13s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InfoHeading = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #0f3d6a;
  font-weight: 800;
  font-family: "Quicksand", sans-serif;
`;

const InfoParagraph = styled.p`
  margin: 0;
  padding: 0;
  margin-top: 5px;
  font-size: 17px;
  font-weight: 600;
  line-height: 25px;
  color: #124170b5;
  /* font-weight: 800; */
  font-family: "Quicksand", sans-serif;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const WhyChooseUsCards = () => {
  // return (
  //   <Column>
  //     <Row>
  //       <InfoBox>
  //         <InfoImage $delay={1} src="/ui-icons/heart.png" alt="Fast" />
  //         <InfoText>
  //           <InfoHeading>We love blender</InfoHeading>
  //           <InfoParagraph>
  //             We wanted to create a tool that makes working with blender more
  //             awesome. Our team has been using blender since 2015.
  //           </InfoParagraph>
  //         </InfoText>
  //       </InfoBox>

  //       <InfoBox>
  //         <InfoImage $delay={3} src="/ui-icons/speed.png" alt="Fast" />
  //         <InfoText>
  //           <InfoHeading>Fast & Affordable</InfoHeading>
  //           <InfoParagraph>
  //             We offer ultra-fast rendering at highly affordable prices, with
  //             access to a wide range of GPUs
  //           </InfoParagraph>
  //         </InfoText>
  //       </InfoBox>

  //       <InfoBox>
  //         <InfoImage $delay={3} src="/ui-icons/speed.png" alt="Fast" />
  //         <InfoText>
  //           <InfoHeading>Fast & Affordable</InfoHeading>
  //           <InfoParagraph>
  //             We offer ultra-fast rendering at highly affordable prices, with
  //             access to a wide range of GPUs
  //           </InfoParagraph>
  //         </InfoText>
  //       </InfoBox>
  //     </Row>

  //     <Row>
  //       <InfoBox>
  //         <InfoImage $delay={0.5} src="/ui-icons/money.png" alt="money" />
  //         <InfoText>
  //           <InfoHeading>Billed by the minute</InfoHeading>
  //           <InfoParagraph>
  //             Our pricing is transparent and predictable with clear per-minute
  //             rates and we offer very affordable services
  //           </InfoParagraph>
  //         </InfoText>
  //       </InfoBox>

  //       <InfoBox>
  //         <InfoImage $delay={2} src="/ui-icons/ui.png" alt="Ui" />
  //         <InfoText>
  //           <InfoHeading>Intuitive User Interface</InfoHeading>
  //           <InfoParagraph>
  //             Our user interface is simple, intuitive, and easy to navigate
  //           </InfoParagraph>
  //         </InfoText>
  //       </InfoBox>
  //     </Row>
  //   </Column>
  // );
  return (
    <InfoSection>
      {/* <InfoBox>
        <InfoImage $delay={1} src="/ui-icons/heart.png" alt="Fast" />
        <InfoText>
          <InfoHeading>We love blender</InfoHeading>
          <InfoParagraph>
            We wanted to create a tool that makes working with blender more
            awesome. Our team has been using blender since 2015.
          </InfoParagraph>
        </InfoText>
      </InfoBox>

      <EmptyBox></EmptyBox> */}

      <InfoBox>
        <InfoImage $delay={2} src="/ui-icons/ui.png" alt="Ui" />
        <InfoText>
          <InfoHeading>Intuitive User Interface</InfoHeading>
          <InfoParagraph>
            Our user interface is simple, intuitive, and easy to navigate
          </InfoParagraph>
        </InfoText>
      </InfoBox>

      <EmptyBox></EmptyBox>

      <EmptyBox></EmptyBox>

      <InfoBox>
        <InfoImage $delay={3} src="/ui-icons/speed.png" alt="Fast" />
        <InfoText>
          <InfoHeading>Fast & Affordable</InfoHeading>
          <InfoParagraph>
            We offer ultra-fast rendering at highly affordable prices, with
            access to a wide range of GPUs
          </InfoParagraph>
        </InfoText>
      </InfoBox>

      <InfoBox>
        <InfoImage $delay={0.5} src="/ui-icons/money.png" alt="money" />
        <InfoText>
          <InfoHeading>Billed by the minute</InfoHeading>
          <InfoParagraph>
            Our pricing is transparent and predictable with clear per-minute
            rates and we offer very affordable services
          </InfoParagraph>
        </InfoText>
      </InfoBox>
      <EmptyBox></EmptyBox>
    </InfoSection>
  );
};

export default WhyChooseUsCards;

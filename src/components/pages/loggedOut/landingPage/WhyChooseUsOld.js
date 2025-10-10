import React from "react";
import styled from "styled-components";
import WhyChooseUsCards from "./WhyChooseUsCards";

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin: 0 0;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
  }

  @media (max-width: 900px) {
    gap: 20px;
  }
`;

const InfoBox = styled.div`
  border: 1px solid #99999943;
  padding: 25px;
  margin: auto;
  width: 100%;
  display: flex;
  border-radius: 10px;
  flex-direction: row;
  gap: 15px;

  @media (min-width: 1024px) {
    max-width: 22.5vw;
    text-align: left;
    margin: 0;
  }
`;

const InfoImage = styled.img`
  height: 40px;
`;

const InfoText = styled.div``;

const InfoHeading = styled.h3`
  margin: 0;
  font-size: 19px;
  font-weight: 500;
  line-height: 32px;
`;

const InfoParagraph = styled.p`
  margin: 0;
  padding: 0;
  margin-top: 5px;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  color: #4b5563;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 6vw;
  gap: 7vw;
  margin-top: 100px;
  width: 100%;
`;

const Section1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  gap: 5px;
`;

const Section2 = styled.div``;

const WhyChooseUs = () => {
  return (
    <Row>
      <Section1>
        <InfoHeading>
          We love blender. We wanted to create a tool that makes working with
          blender more awesome.
        </InfoHeading>

        <InfoParagraph>
          Our team has been using blender since 2015.
        </InfoParagraph>
      </Section1>

      <Section2>
        <WhyChooseUsCards />
      </Section2>
    </Row>
  );
};

export default WhyChooseUs;

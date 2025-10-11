import React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  /* background: linear-gradient(180deg, #f6f6ff 0%, #eae8ff 100%); */
  color: #2a2752;
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  padding: 60px 40px;
  gap: 100px;
  margin-top: 100px;
`;

const Header = styled.h1`
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 0;
  color: #2a2752;
`;

const SubText = styled.p`
  color: #5b567f;
  font-size: 1rem;
  /* text-align: center; */
  max-width: 550px;
  line-height: 1.6;
  margin-bottom: 60px;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  /* border-top: 1px solid rgba(177, 166, 255, 0.3); */
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  margin-top: 30px;
`;

const SectionLabel = styled.span`
  font-size: 1rem;
  color: #7b74a6;
  letter-spacing: 0.5px;
`;

const GPUCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(177, 166, 255, 0.3);
  padding: 20px 25px;
  border-radius: 16px;
  margin-bottom: 14px;
  box-shadow: 0 6px 20px rgba(177, 166, 255, 0.15);
  transition: all 0.25s ease;
  /* &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(177, 166, 255, 0.25);
    background: rgba(255, 255, 255, 0.6);
  } */
`;

const GPUName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  flex: 1;
  color: #2a2752;
`;

const GPUInfo = styled.div`
  display: flex;
  gap: 10px;
  flex: 3;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: rgba(177, 166, 255, 0.12);
  border: 1px solid rgba(177, 166, 255, 0.3);
  color: #3b347a;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const Price = styled.div`
  font-size: 1rem;
  color: #6b5fff;
  font-weight: 600;
  flex: 1;
  text-align: right;
`;

const ArrowButton = styled.button`
  background: rgba(177, 166, 255, 0.2);
  border: 1px solid rgba(177, 166, 255, 0.4);
  color: #6b5fff;
  padding: 8px 10px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: rgba(177, 166, 255, 0.35);
    transform: scale(1.1);
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const GpuSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const GPUSection = ({ title, gpus }) => (
  <GpuSectionContainer>
    <SectionTitle>
      <SectionLabel>{title}</SectionLabel>
    </SectionTitle>
    {gpus.map((gpu, idx) => (
      <GPUCard key={idx}>
        <GPUName>{gpu.name}</GPUName>
        <GPUInfo>
          <Tag>{gpu.vram}</Tag>
          <Tag>{gpu.ram}</Tag>
          <Tag>{gpu.cpu}</Tag>
        </GPUInfo>
        <Price>{gpu.price}</Price>
        {/* <ArrowButton>→</ArrowButton> */}
      </GPUCard>
    ))}
  </GpuSectionContainer>
);

export default function PricingSection() {
  const gpuGroups = [
    {
      title: "Ampere Architecture - Fast",
      gpus: [
        {
          name: "L40S",
          vram: "48 GB VRAM",
          ram: "94 GB RAM",
          cpu: "16 vCPUs",
          price: "$1.8/hr",
        },
        {
          name: "A40",
          vram: "180 GB VRAM",
          ram: "283 GB RAM",
          cpu: "28 vCPUs",
          price: "$1.2/hr",
        },
      ],
    },
    {
      title: "Hopper Architecture - Blazing Fast",
      gpus: [
        {
          name: "H100 PCIe",
          vram: "80 GB VRAM",
          ram: "188 GB RAM",
          cpu: "16 vCPUs",
          price: "$3.6/hr",
        },
      ],
    },
  ];

  return (
    <PageWrapper>
      <HeaderSection>
        <Header>GPU Cloud Pricing</Header>
        <SubText>
          Simple, transparent pricing plans for teams of all sizes.
        </SubText>
      </HeaderSection>

      <TableWrapper>
        {gpuGroups.map((section, i) => (
          <GPUSection key={i} title={section.title} gpus={section.gpus} />
        ))}
      </TableWrapper>
    </PageWrapper>
  );
}

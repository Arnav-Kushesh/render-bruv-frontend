import styled from "styled-components";
import supportedGpuTypes from "../../../../../data/supportedGpuTypes";
import PricingCard from "./PricingCard";
import CustomLabelHeading from "../../../../applicationUI/customLabel/CustomLabelHeading";

const Section = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 100px;
  gap: 40px;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: center;
`;

const Label = styled.div`
  width: 60vw;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  font-family: "Quicksand", sans-serif;
`;
export default function PricingSection() {
  let items = [];

  for (let gpuId in supportedGpuTypes) {
    let item = supportedGpuTypes[gpuId];
    items.push(<PricingCard item={item} />);
  }

  return (
    <Section>
      <Label>Pricing</Label>
      <List>{items}</List>
    </Section>
  );
}

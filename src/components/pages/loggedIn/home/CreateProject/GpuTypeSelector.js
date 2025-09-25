import styled from "styled-components";
import GpuTypeCard from "./GpuTypeCard";

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export default function GpuTypeSelector({ value, onChange }) {
  let options = [
    {
      name: "Basic",
      price: "1$/Hour",
      cardName: "GTX 4090",
      value: "GTX_4090",
    },
    {
      name: "Basic",
      price: "1$/Hour",
      cardName: "GTX 4090",
      value: "GTX_4091",
    },
    {
      name: "Basic",
      price: "1$/Hour",
      cardName: "GTX 4090",
      value: "GTX_4092",
    },
  ];

  return (
    <List>
      {options.map((item) => (
        <GpuTypeCard value={value} onChange={onChange} item={item} />
      ))}
    </List>
  );
}

import styled from "styled-components";
import GpuTypeCard from "./GpuTypeCard";
import supportedGpuTypes from "../../../../../data/supportedGpuTypes";

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export default function GpuTypeSelector({ value, onChange }) {
  let items = [];

  for (let gpuId in supportedGpuTypes) {
    let item = supportedGpuTypes[gpuId];
    if (item.disabled) continue;
    items.push(
      <GpuTypeCard
        key={gpuId}
        value={value}
        onChange={onChange}
        item={{ ...item, value: gpuId }}
      />
    );
  }
  return <List>{items}</List>;
}

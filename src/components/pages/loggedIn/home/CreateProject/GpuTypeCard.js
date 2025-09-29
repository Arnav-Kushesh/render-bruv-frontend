import { useContext } from "react";

import styled from "styled-components";
import Context from "../../../../../Context";

const InfoBox = styled.section`
  cursor: pointer;
  transition: 0.15s ease-in-out;
  border: 1px solid var(--borderIntense);
  background: var(--surface);
  /* color: var(--element); */
  padding: 20px;
  /* max-width: 80vw; */
  margin: auto;
  width: 300px;
  display: flex;
  border-radius: 12px;
  flex-direction: row;
  justify-content: flex-start;
  /* justify-content: center; */
  align-items: center;
  gap: 15px;
  box-shadow: 0px 4px 0px 0 var(--shadowIntense);

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Name = styled.div`
  color: var(--element);
  font-size: 12px;
  font-weight: 700;
`;

const IconImage = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  height: 35px;
  width: 35px;
  object-fit: contain;
`;

const Column1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const Secondary = styled.div`
  font-size: 13px;
  font-weight: 700;
  opacity: 0.7;
`;

const Column2 = styled.div``;

let placeholderItem = {
  title: "Lotus Scene",
  minuteRan: 10,
  charges: 1000, ///cents
  status: "RUNNING",
};

const Status = styled.div`
  color: #000;
  padding: 5px 10px;
  font-weight: 700;
  padding: 10px 15px;
  font-size: 12px;
  text-transform: capitalize;
  border-radius: 100px;

  ${({ $status }) => {
    if ($status == "RUNNING") {
      return `background-color: #638cff;`;
    } else {
      return `background-color: tomato;`;
    }
  }}
`;

const Img = styled.img`
  height: 40px;
  width: auto;
`;

export default function GpuTypeCard({ item, value, onChange }) {
  const { colorMode } = useContext(Context);

  let isSelected = value == item.value;

  return (
    <InfoBox
      style={{ opacity: isSelected ? 1 : 0.4 }}
      onClick={() => {
        onChange(item.value);
      }}
    >
      <Img
        src="/vector-graphics/server.png"
        style={{ filter: colorMode == "DARK" ? "invert(1)" : "unset" }}
      />
      <Column1>
        <Title>{item.label}</Title>

        <Secondary>
          ${item.price / 100}/hr {"."} {item.secondaryLabel}
        </Secondary>
      </Column1>
    </InfoBox>
  );
}

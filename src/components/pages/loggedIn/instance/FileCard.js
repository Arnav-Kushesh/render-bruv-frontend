import { useContext } from "react";

import styled from "styled-components";

import { FaExternalLinkAlt } from "react-icons/fa";
import Context from "../../../../Context";

const InfoBox = styled.section`
  cursor: pointer;
  transition: 0.15s ease-in-out;
  border: 1px solid var(--border);
  background: var(--surface2);
  /* color: var(--element); */
  padding: 15px;
  /* max-width: 80vw; */
  margin: auto;
  width: 100%;
  display: flex;
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  /* justify-content: center; */
  align-items: center;
  gap: 15px;
  /* box-shadow: 0px 4px 0px 0 var(--shadowIntense); */

  &:hover {
    transform: scale(0.97);
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

const Button = styled.div`
  background-color: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 100px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

export default function FileCard({ fileName, baseUrl }) {
  const {} = useContext(Context);

  //   item = { name: "000.png", size: 5 };

  return (
    <InfoBox onClick={downloadFile}>
      <Column1>
        <Title>{fileName}</Title>

        <Secondary>Image</Secondary>
      </Column1>

      <Button>
        <FaExternalLinkAlt />
      </Button>
    </InfoBox>
  );

  function downloadFile() {
    let link = `${baseUrl}/images/${fileName}`;
    window.open(link, "_blank");
  }
}

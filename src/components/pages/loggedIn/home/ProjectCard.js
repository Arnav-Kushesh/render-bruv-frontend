import { useContext } from "react";

import styled from "styled-components";
import Context from "../../../../Context";
import goTo from "../../../../controllers/goTo";

const InfoBox = styled.section`
  cursor: pointer;
  transition: 0.15s ease-in-out;

  background: var(--activeSurface);

  border: 1px solid var(--border);
  box-shadow: 0px 1px 0 0 var(--solidShadow);

  border: 1px solid var(--borderIntense);
  box-shadow: var(--shadow);

  /* color: var(--element); */
  padding: 25px;
  /* max-width: 80vw; */
  margin: auto;
  width: 420px;
  display: flex;
  border-radius: 17px;
  flex-direction: row;
  justify-content: space-between;
  /* justify-content: center; */
  align-items: flex-start;
  gap: 15px;

  filter: brightness(1);
  &:hover {
    transform: scale(1.02);
    filter: brightness(1.1);
  }

  @media (max-width: 900px) {
    width: 300px;
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
  font-size: 15px;
  font-weight: 700;
`;

const Secondary = styled.div`
  font-size: 14px;
  font-weight: 700;
  opacity: 0.7;
`;

const Column2 = styled.div``;

const Status = styled.div`
  color: var(--element);
  padding: 5px 10px;
  font-weight: 700;
  padding: 10px 15px;
  font-size: 12px;
  text-transform: capitalize;
  border-radius: 100px;

  ${({ $status }) => {
    if ($status == "RUNNING") {
      // return `background: linear-gradient(350deg, #1644eaff, #5cb9ff)`;
      return `background: #5fb8ff;
      color: #000;
      `;
    } else {
      return `background-color: var(--surface2); 
      border:1px solid var(--borderDim);  opacity:0.7;`;
    }
  }}
`;

export default function ProjectCard({ item, onClick }) {
  const {} = useContext(Context);

  // item = placeholderItem;

  // let { serverInstance } = item;

  return (
    <InfoBox onClick={goTo(`/manage-instance/${item._id}`)}>
      <Column1>
        <Title>{item.projectName}</Title>

        <Secondary>Usage: ${item.charges / 100}</Secondary>
        <Secondary>Total Time: {item.minuteRan} Mins</Secondary>
      </Column1>

      <Column2>
        <Status $status={item.status}>{item.status.toLowerCase()}</Status>
      </Column2>
    </InfoBox>
  );
}

import styled from "styled-components";
import { FaGraduationCap, FaBookOpen, FaSchool } from "react-icons/fa";
import parseYear from "../../../../controllers/parseYear";

const Items = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  text-transform: capitalize;
  color: var(--elementDim);
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 4px;
`;

const ItemInfo = ({ data }) => {
  if (!data) return null;

  if (!data.role) return null;
  if (!data.companyName) return null;

  return (
    <Row>
      {data.role} @ {data.companyName} ({parseYear(data.startYear)} -{" "}
      {data.endYear ? parseYear(data.endYear) : "Present"})
    </Row>
  );
};

export default function WorkExperience({ workExperience }) {
  if (!workExperience) return null;

  return (
    <Items>
      {workExperience.map((item, index) => (
        <ItemInfo key={index} data={item} />
      ))}
    </Items>
  );
}

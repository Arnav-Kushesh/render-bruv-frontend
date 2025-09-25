import styled from "styled-components";
import { FaGraduationCap, FaBookOpen, FaSchool } from "react-icons/fa";
import parseYear from "../../../../controllers/parseYear";

const Items = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
  color: #1f2937;
`;

const Row = styled.div`
  font-size: 14px;
  text-transform: capitalize;
  color: var(--elementDim);
  font-weight: 600;
  line-height: 22px;
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 4px;
`;

const getData = ({ title, data }) => {
  if (!data) return null;
  if (!data.instituteName) return null;

  return `${data.courseName ? data.courseName : title} from ${data.instituteName} (
      ${parseYear(data.startYear)} -
      ${data.endYear ? parseYear(data.endYear) : "Present"})`;
};

export default function EducationalInfo({ educationalBackground }) {
  let theText = [];

  if (educationalBackground.school)
    if (educationalBackground.school.instituteName)
      theText.push(
        getData({ title: "Schooling", data: educationalBackground.school })
      );

  if (educationalBackground.graduation)
    if (educationalBackground.graduation.instituteName)
      theText.push(
        getData({ title: "Graduation", data: educationalBackground.graduation })
      );

  if (educationalBackground.postGraduation)
    if (educationalBackground.postGraduation.instituteName)
      theText.push(
        getData({
          title: "Post Graduation",
          data: educationalBackground.postGraduation,
        })
      );

  return <Row>{theText.join(" . ")}</Row>;
}

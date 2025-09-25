import styled from "styled-components";
import { useContext } from "react";
import Context from "../../../../Context";
import ProjectCard from "./ProjectCard";
import CustomLabelLarge from "../../../applicationUI/CustomLabelLarge";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  /* width: 100%; */
  width: 450px;
  align-items: flex-start;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export default function RecentProjectList() {
  const { updateLoggedInUser, loggedInUser, isMobile } = useContext(Context);

  return (
    <Container>
      <CustomLabelLarge>Recent Projects</CustomLabelLarge>

      <List>
        <ProjectCard item={null} />
        <ProjectCard item={null} />
        <ProjectCard item={null} />
        <ProjectCard item={null} />
        <ProjectCard item={null} />
      </List>
    </Container>
  );
}

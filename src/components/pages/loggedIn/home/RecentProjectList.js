import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Context from "../../../../Context";
import ProjectCard from "./ProjectCard";
import CustomLabelLarge from "../../../applicationUI/customLabel/CustomLabelLarge";
import LoadingSection from "../../../helperComponents/LoadingSection";
import { serverLine } from "../../../../controllers/network/serverLine";

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
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  if (loading)
    return (
      <Container>
        <CustomLabelLarge>Recent Projects</CustomLabelLarge>
        <List>
          <LoadingSection />
        </List>
      </Container>
    );

  return (
    <Container>
      <CustomLabelLarge>Recent Projects</CustomLabelLarge>

      <List>
        {list && list.map((item) => <ProjectCard key={item._id} item={item} />)}
      </List>
    </Container>
  );

  async function loadItems() {
    setLoading(true);

    let items = await serverLine.get("/server-instances");
    setList(items.list);
    setLoading(false);
  }
}

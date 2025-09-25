import { useContext, useEffect, useState } from "react";
import { serverLine } from "../../../../controllers/network/serverLine.js";
import LoggedInBoilerplate from "../LoggedInBoilerplate.js";
import LoadingSection from "../../../helperComponents/LoadingSection.js";
import getSubPath from "../../../../controllers/getSubPath.js";
import Context from "../../../../Context.js";
import ProfileDetailSectionMobile from "./ProfileDetailSectionMobile.js";
import styled from "styled-components";
import MessageBox from "../../../helperComponents/MessageBox.js";
import ProfilePageFeed from "./ProfilePageFeed.js";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin-top: 30px;

  @media (max-width: 900px) {
    width: 100%;
    margin: 0;
  }
`;

export default function ProfilePage({ onClick }) {
  const { isMobile } = useContext(Context);

  const [item, setItem] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  let newitemId = getSubPath(1);

  useEffect(() => {
    setUsername(newitemId);
  }, [newitemId]);

  useEffect(() => {
    if (username) loadProfile();
  }, [username]);

  let core = null;

  let titleLine1 = "Profile";
  let titleLine2 = "Page";

  if (loading) {
    core = <LoadingSection />;
  } else {
    if (!item) return null;

    titleLine1 = "Profile Page";

    core = <ProfileDetailSectionMobile item={item} />;
  }

  if (item)
    if (item.isBanned) {
      item = null;
      core = <MessageBox>This user is banned</MessageBox>;
    }

  return (
    <LoggedInBoilerplate
      showBackButton={true}
      titleLine1={titleLine1}
      titleLine2={titleLine2}
    >
      <Center>
        <Container>
          {core}

          {item ? <ProfilePageFeed user={item} /> : null}
        </Container>
      </Center>
    </LoggedInBoilerplate>
  );

  async function loadProfile() {
    setLoading(true);
    let data = await serverLine.get(`/profile/?username=${username}`);
    setItem(data);
    setLoading(false);
  }
}

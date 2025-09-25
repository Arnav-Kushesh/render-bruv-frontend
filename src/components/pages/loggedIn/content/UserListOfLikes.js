import { useEffect, useState } from "react";
import { serverLine } from "../../../../controllers/network/serverLine";
import ProfileCard from "../profiles/ProfileCard";
import styled from "styled-components";
import LoadingSection from "../../../helperComponents/LoadingSection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 25px;
`;

export default function UserListOfLikes({ contentId, commentId }) {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading)
    return (
      <Container>
        <LoadingSection />
      </Container>
    );

  return (
    <Container>
      {userList.map((item) => (
        <ProfileCard data={item} />
      ))}
    </Container>
  );

  function loadUsers() {
    let path = `/user-list-of-likes/?`;
    if (commentId) path = `${path}commentId=${commentId}`;
    if (contentId) path = `${path}contentId=${contentId}`;

    serverLine.get(path).then((data) => {
      setLoading(false);
      setUserList(data);
    });
  }
}

import styled from "styled-components";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { serverLine } from "../../../../controllers/network/serverLine";
import capitalizeFirstLetter from "../../../../controllers/capitalizeFirstLetter";
import LoadingSection from "../../../helperComponents/LoadingSection";
import Context from "../../../../Context";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import goTo from "../../../../controllers/goTo";
import MessageBox from "../../../helperComponents/MessageBox";

const Container = styled.div`
  display: flex;
  color: var(--element);
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 25px;
`;

const List = styled.div`
  display: flex;
  color: var(--element);
  flex-direction: column;
  align-items: center;
  width: 38vw;
  gap: 15px;
  margin-top: 50px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
    margin-top: 0;
  }
`;

const Notification = styled.div`
  background: var(--surface);
  border: 1px solid var(--borderDim);
  padding: 25px 25px;
  /* cursor: pointer; */
  width: 100%;
  border-radius: 15px;

  color: var(--element);
  display: flex;
  flex-direction: column;
  gap: 18px;

  ${({ seen }) => {
    if (!seen)
      return `
      background:var(--accentSurfaceSubtle);
      color:var(--element);`;
  }}
`;

const NotificationText = styled.div`
  /* text-transform: capitalize; */
  font-size: 15px;
  font-weight: 500;
`;
const Button = styled.button`
  /* flex: 1; */
  position: relative;
  background: var(--surface);
  border: 1px solid var(--borderDim);
  font-size: 15px;
  padding: 10px 25px;
  font-weight: 500;
  color: var(--color);
  cursor: pointer;
  border-radius: 50px;

  &:hover {
    background-color: var(--color);
    color: var(--bgColor);
  }

  ${({ seen }) => {
    if (!seen)
      return `
      background:var(--accent);
      color:var(--accentAlt);
      

      &:hover {
        color: var(--accent);
        background-color: var(--accentAlt);
      }
      
      `;
  }}
`;
const NotificationButtons = styled.div`
  display: flex;
  flex-direction: row;

  gap: 15px;
`;

export default function NotificationsPage() {
  const { loggedInUserId, loggedInUser, setNotificationCount, setForm } =
    useContext(Context);
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedInUserId) {
      serverLine.get("/notifications").then((data) => {
        setNotificationCount(0);

        setRes(data);
        setLoading(false);
      });
    }
  }, [loggedInUserId]);

  if (!loggedInUserId) return "Login to continue";

  return (
    <LoggedInBoilerplate
      titleLine1={"Notifications"}
      titleLine2={"Page"}
      showBackButton={true}
    >
      <Container>
        <List>{renderResult()}</List>
      </Container>
      ;
    </LoggedInBoilerplate>
  );

  function renderResult() {
    if (!loggedInUser) return <LoadingSection />;

    if (loading) return <LoadingSection />;

    if (!res) return [];
    if (!res.notifs) return [];

    if (!res.notifs.length)
      return <MessageBox>No Notifications yet</MessageBox>;

    return res.notifs.map((item) => {
      return getNotif({ item });
    });
  }

  function getNotif({ item }) {
    let seen = hasSeen(item.createdAt);

    // return JSON.stringify(item);
    if (!item.sender)
      return (
        <Notification>The Person involved has deleted the account</Notification>
      );

    if (item.type == "FOLLOW") {
      return (
        <Notification seen={seen} key={item._id}>
          <NotificationText>
            {capitalizeFirstLetter(item.sender.username)} started following you
          </NotificationText>
          <NotificationButtons>
            <Button seen={seen} onClick={goTo("/u/" + item.sender.username)}>
              Visit Profile
            </Button>
          </NotificationButtons>
        </Notification>
      );
    } else if (item.type === "COMMENT") {
      return (
        <Notification seen={seen} key={item._id}>
          <NotificationText>
            {capitalizeFirstLetter(item.sender.username)} has commented on your
            post : {capitalizeFirstLetter(item?.data?.text)}
          </NotificationText>
          <NotificationText>Post: {item?.contentData?.title}</NotificationText>
          <NotificationButtons>
            <Button seen={seen} onClick={goTo("/u/" + item.sender.username)}>
              Open Profile
            </Button>
            <Button seen={seen} onClick={goTo("/p/" + item.contentId)}>
              Open Post
            </Button>
          </NotificationButtons>
        </Notification>
      );
    } else if (item.type === "LIKE") {
      if (item.commentId) {
        return (
          <Notification seen={seen} key={item._id}>
            <NotificationText>
              {capitalizeFirstLetter(item.sender.username)} has liked your
              comment
            </NotificationText>
            <NotificationText>
              Comment: {item?.commentData?.data?.text}
            </NotificationText>
            <NotificationButtons>
              <Button seen={seen} onClick={goTo("/u/" + item.sender.username)}>
                Open Profile
              </Button>
              <Button seen={seen} onClick={goTo("/p/" + item.contentId)}>
                Open Post
              </Button>
            </NotificationButtons>
          </Notification>
        );
      }

      return (
        <Notification seen={seen} key={item._id}>
          <NotificationText>
            {capitalizeFirstLetter(item.sender.username)} has liked your post{" "}
          </NotificationText>
          <NotificationText>Post: {item?.contentData?.title}</NotificationText>
          <NotificationButtons>
            <Button seen={seen} onClick={goTo("/u/" + item.sender.username)}>
              Open Profile
            </Button>
            <Button seen={seen} onClick={goTo("/p/" + item.subjectId)}>
              Open Post
            </Button>
          </NotificationButtons>
        </Notification>
      );
    } else if (item.type === "REPLY") {
      return (
        <Notification seen={seen} key={item._id}>
          <NotificationText>
            {capitalizeFirstLetter(item.sender.username)} has replied to your
            comment : {capitalizeFirstLetter(item?.data?.text)}
          </NotificationText>
          <NotificationText>
            Your Comment: {item?.commentData?.data?.text}
          </NotificationText>
          <NotificationButtons>
            <Button seen={seen} onClick={goTo("/u/" + item.sender.username)}>
              Open Profile
            </Button>
            <Button seen={seen} onClick={goTo("/p/" + item.contentId)}>
              Open Post
            </Button>
          </NotificationButtons>
        </Notification>
      );
    } else {
      return (
        <Notification seen={seen} key={item._id}>
          <NotificationText>
            {item.sender.username} - {item.type}
          </NotificationText>

          <NotificationButtons>
            <Button seen={seen} onClick={followApprove(true, item._id)}>
              Open Profile
            </Button>
          </NotificationButtons>
        </Notification>
      );
    }
  }

  function followApprove(status, notificationID) {
    return async () => {
      if (status) {
        updateNotif(notificationID, "status", "POSITIVE");
      } else {
        updateNotif(notificationID, "status", "DECLINED");
      }

      await serverLine.post("/approve-follow", { notificationID, status });
    };
  }

  function updateNotif(id, field, value) {
    let newNotifs = { ...res };
    let content = [...newNotifs.notifs];

    for (let item of content) {
      if (item._id == id) {
        item[field] = value;
      }
    }

    setRes(newNotifs);
  }

  function hasSeen(createdAt) {
    let createdAtEpochs = new Date(createdAt).valueOf();
    let notificationsSeenAt = new Date(
      res.notificationsSeenAt ? res.notificationsSeenAt : 0
    ).valueOf();
    // console.log(createdAtEpochs, notificationsSeenAt);

    // return false;
    return createdAtEpochs < notificationsSeenAt;
  }
}

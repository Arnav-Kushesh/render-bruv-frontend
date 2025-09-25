import styled from "styled-components";
import CardForItem from "../../../applicationUI/CardForItem";
import LikeButton from "./LikeButton";
import CustomButton from "../../../helperComponents/CustomButton";
import { BiComment } from "react-icons/bi";
import { useContext } from "react";
import Context from "../../../../Context";
import CommentList from "../../../applicationUI/commentsAndReplies/CommentList";
import contentCardButtonStyle from "../../../../data/contentCardButtonStyle";
import getImageURL from "../../../../controllers/getImageURL";
import goTo from "../../../../controllers/goTo";
import parseDropDownValue from "../../../../controllers/utils/parseDropDownValue";
import contentPurposeTypes from "../../../../data/contentPurposeTypes";
import UserListOfLikes from "./UserListOfLikes";
import MessageBox from "../../../helperComponents/MessageBox";

import shareExternally from "../../../../controllers/shareExternally";
import { PiShareFat } from "react-icons/pi";

const TertiaryLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`;

const Name = styled.div`
  font-size: 21px;
  font-weight: 900;
  color: var(--element);
`;

const BubbleText = styled.div`
  background-color: var(--surface);
  padding: 5px 12px;
  color: var(--element);
  border-radius: 15px;
  text-transform: capitalize;
`;

const TertiaryText = styled.div``;

const PrimaryInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

const Buttons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
`;

const VirtualCard = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const PaddingForPopup = styled.div`
  padding: 25px;
`;

const OpenProfileButton = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 10px;
  border: 1px solid var(--accentDim);
  cursor: pointer;
`;

export default function ContentCard({ data, forReportPurposes }) {
  const { setForm } = useContext(Context);

  let bubbleLine = [
    {
      text: "@" + data.author.username,
      onClick: goTo(`/u/${data.author.username}`),
    },
    data.purpose && {
      text: parseDropDownValue({
        query: data.purpose,
        theArray: contentPurposeTypes,
      }),
    },

    data.likeCount && {
      text: `${data.likeCount} Likes`,
      onClick: openLikeList,
    },
  ];

  if (data.isBanned) {
    return <MessageBox>This content is banned</MessageBox>;
  }

  if (data.isDeleted) {
    return null;
  }

  let additionalComp = null;

  return (
    <CardForItem
      item={data}
      additionalComp={additionalComp}
      itemType={"CONTENT"}
      pagePath="c"
      itemId={data._id}
      editPath={"manage-post"}
      image={data.images[0]}
      bubbleLine={bubbleLine}
      title={data.title}
      description={data.description}
      buttons={[
        <OpenProfileButton
          onClick={goTo(`/u/${data.author.username}`)}
          src={getImageURL(data.author.profileImage, true)}
        />,
        <LikeButton
          status={data.isLiked}
          contentId={data._id}
          count={data.likeCount}
        />,

        <CustomButton
          style={{ ...contentCardButtonStyle }}
          icon={<BiComment />}
          onClick={openComments}
        >
          {data.commentCount}
        </CustomButton>,
        <CustomButton
          style={{ ...contentCardButtonStyle }}
          icon={<PiShareFat />}
          onClick={doSharing}
        ></CustomButton>,
      ]}
    />
  );

  function doSharing() {
    shareExternally(`https://renderbruv.com/p/${data._id}`);
  }

  function openLikeList() {
    setForm({
      title: "Likes",
      component: <UserListOfLikes contentId={data._id} />,
    });
  }

  function openComments() {
    setForm({
      title: "Comments",
      component: (
        <PaddingForPopup>
          <CommentList contentId={data._id} />
        </PaddingForPopup>
      ),
    });
  }
}

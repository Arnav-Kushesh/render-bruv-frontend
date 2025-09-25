import styled from "styled-components";
import getImageURL from "../../../controllers/getImageURL";
import { useContext, useState } from "react";
import CommentLikeButton from "./CommentLikeButton";
import CustomButton from "../../helperComponents/CustomButton";
import capitalizeFirstLetter from "../../../controllers/capitalizeFirstLetter";
import Context from "../../../Context";
import { serverLine } from "../../../controllers/network/serverLine";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--element);
`;

const Part1 = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 5px;

  gap: 10px;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100px;
  object-fit: cover;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const Text = styled.span`
  font-size: 15px;
  padding: 10px;
  background-color: var(--surface2);
  border: 1px solid var(--borderDim);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media (max-width: 900px) {
    font-size: 13px;
  }
`;

const AuthorName = styled.b`
  margin-right: 10px;
  text-transform: capitalize;
  font-weight: 700;

  @media (max-width: 900px) {
    margin-right: 5px;
  }
`;

const CommentText = styled.span`
  font-weight: 500;
`;

const SecondaryText = styled.span`
  opacity: 0.7;

  font-size: 13px;

  @media (max-width: 900px) {
    font-size: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Indent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  gap: 15px;
`;

const CollapseRod = styled.div`
  /* height: 100%; */
  width: 10px;
  cursor: pointer;
  border-left: 2px solid var(--borderDim);
  /* flex: 1; */
  /* background-color: var(--accent); */
`;

export default function CommentCard({ data, children }) {
  const { loggedInUser } = useContext(Context);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  if (isDeleted) return false;

  if (data.isDeleted) return false;

  if (!data._id)
    return (
      <Container>
        <Part1>comment._id is missing </Part1>
      </Container>
    );

  if (data.myNewComment) console.log(data);

  let additionalButtons = [];

  if ({ loggedInUser }) {
    if (loggedInUser._id == data?.author?._id) {
      additionalButtons.push(
        <CustomButton
          style={{ border: "none", height: "30px" }}
          customVariant={"SMALL_AND_MINIMAL"}
          onClick={deleteComment}
          // icon={<MdDelete />}
        >
          Delete
        </CustomButton>
      );
    }
  }

  return (
    <Container>
      <Part1>
        <Image src={getImageURL(data?.author?.profileImage, true)} />
        <Main>
          <Text>
            <AuthorName>{data?.author?.name} </AuthorName>
            <CommentText>{capitalizeFirstLetter(data?.data?.text)}</CommentText>
          </Text>

          <Buttons data-one={JSON.stringify(data)}>
            <CommentLikeButton
              count={data.likeCount}
              status={data.isLiked}
              commentId={data._id}
            />
            <CustomButton
              customVariant={"SMALL_AND_MINIMAL"}
              onClick={showOrHideReplies}
            >
              {showReplies ? "Collapse Replies" : "Replies"}{" "}
              {data.replyCount ? `(${data.replyCount})` : null}
            </CustomButton>

            {additionalButtons}
          </Buttons>

          {/* Using display none instead of conditional rendering to preserve my comments in comment list */}

          <Indent style={{ display: showReplies ? "flex" : "none" }}>
            <CollapseRod onClick={showOrHideReplies} />
            {children}
          </Indent>
        </Main>
      </Part1>
    </Container>
  );

  function deleteComment() {
    serverLine.post("/delete", { itemType: "COMMENT", itemId: data._id });
    setIsDeleted(true);
  }

  function showOrHideReplies() {
    setShowReplies(!showReplies);
  }
}

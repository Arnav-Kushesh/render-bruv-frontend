import { useEffect, useState } from "react";
import styled from "styled-components";
import MakeComment from "./MakeComment";
import { serverLine } from "../../../controllers/network/serverLine";
import CommentCard from "./CommentCard";
import LoadingSection from "../../helperComponents/LoadingSection";

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export default function CommentList({
  contentId,
  rootCommentId,
  parentCommentId,
  higherLevelReplies = [], //beyond 2nd level replies
  level = 1,
}) {
  const [myNewComments, setMyNewComments] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (level > 2) {
      setLoading(false);
    }

    loadComments();
  }, []);

  let nextLevel = level + 1;

  let listToUse = getListToUse();

  let allComments = [...myNewComments, ...listToUse];

  console.log("myNewComments", myNewComments);
  console.log("listToUse", listToUse);
  console.log("allComments", allComments);
  console.log(level, rootCommentId);

  if (loading) return <LoadingSection />;

  return (
    <List>
      <MakeComment
        contentId={contentId}
        parentCommentId={parentCommentId}
        rootCommentId={rootCommentId}
        onNewComment={onNewComment}
      />

      {allComments.map((item) => (
        <CommentCard key={item._id} data={item}>
          <CommentList
            level={nextLevel}
            contentId={contentId}
            rootCommentId={getRootCommentID(item)}
            parentCommentId={item._id}
            higherLevelReplies={item.children ? item.children : []}
          />
        </CommentCard>
      ))}
    </List>
  );

  function getRootCommentID(item) {
    if (level == 1) return item._id;

    return rootCommentId;
  }

  async function loadComments() {
    if (level == 1) {
      let res = await serverLine.get(`/comments/?contentId=${contentId}`);
      setItems(res.comments);
    }

    if (level == 2) {
      if (!rootCommentId) return window.popupAlert("rootCommentId is missing");
      let res = await serverLine.get(
        `/replies/?contentId=${contentId}&rootCommentId=${rootCommentId}`
      );

      setItems(res);
    }

    setLoading(false);
  }

  function getListToUse() {
    if (level > 2) return higherLevelReplies;

    return items;
  }

  function onNewComment(newItem) {
    let newComments = [...myNewComments];
    newComments.push(newItem);
    setMyNewComments(newComments);
  }
}

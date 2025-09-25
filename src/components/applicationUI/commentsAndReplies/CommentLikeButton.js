import { useState } from "react";
import CustomButton from "../../helperComponents/CustomButton";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { serverLine } from "../../../controllers/network/serverLine";

export default function CommentLikeButton({
  status,
  commentId,
  contentId,
  count,
}) {
  const [likeStatus, setLikeStatus] = useState(status);
  const [likeCount, setLikeCount] = useState(count ? count : 0);

  return (
    <CustomButton
      style={{ border: "none", height: "30px" }}
      customVariant="SMALL_AND_MINIMAL"
      onClick={like}
      icon={likeStatus ? <RiHeartFill /> : <RiHeartLine />}
    >
      {likeCount}
      {/* {likeStatus ? "Unlike" : "Like"} */}
    </CustomButton>
  );

  function like() {
    if (likeStatus) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLikeStatus(!likeStatus);
    serverLine.post("/like", {
      commentId: commentId,
      contentId: contentId,
      action: likeStatus ? "UNLIKE" : "LIKE",
    });
  }
}

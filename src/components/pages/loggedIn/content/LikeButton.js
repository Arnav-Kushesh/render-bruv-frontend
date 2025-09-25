import { useContext, useState } from "react";
import CustomButton from "../../../helperComponents/CustomButton";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { serverLine } from "../../../../controllers/network/serverLine";
import contentCardButtonStyle from "../../../../data/contentCardButtonStyle";
import ConfettiInstance from "../../../fx/ConfettiInstance";
import Context from "../../../../Context";

export default function LikeButton({ status, contentId, count }) {
  const { loggedInUser } = useContext(Context);
  const [likeStatus, setLikeStatus] = useState(status);
  const [likeCount, setLikeCount] = useState(count ? count : 0);
  const [isExploding, setIsExploding] = useState(false);

  let theStyle = { ...contentCardButtonStyle };
  let iconStyle = { fontSize: "20px" };
  let textStyle = {};

  if (likeStatus) {
    theStyle.background = "var(--accent)";
    theStyle.border = "1px solid var(--accent)";
    iconStyle.color = "var(--elementAlt)";
    textStyle.color = "var(--elementAlt)";
  }

  return (
    <CustomButton
      style={theStyle}
      onClick={like}
      iconStyle={iconStyle}
      textStyle={textStyle}
      icon={likeStatus ? <RiHeartFill /> : <RiHeartLine />}
    >
      {isExploding ? <ConfettiInstance /> : null}
      {likeCount}

      {/* {likeStatus ? "Unlike" : "Like"} */}
    </CustomButton>
  );

  function like() {
    if (!loggedInUser) return window.popupAlert("Login required");

    if (likeStatus) {
      setLikeCount(likeCount - 1);
      setIsExploding(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsExploding(true);
    }
    setLikeStatus(!likeStatus);
    serverLine.post("/like", {
      contentId: contentId,

      action: likeStatus ? "UNLIKE" : "LIKE",
    });
  }
}

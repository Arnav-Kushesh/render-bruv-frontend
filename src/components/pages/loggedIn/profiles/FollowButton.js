import { useContext, useState } from "react";
import { serverLine } from "../../../../controllers/network/serverLine";
import PrimaryButton from "../../../helperComponents/PrimaryButton";
import { RiUserFollowFill } from "react-icons/ri";
import Context from "../../../../Context";
import { FaCheck } from "react-icons/fa";

export default function FollowButton({ status, receiverUserId }) {
  const { loggedInUser } = useContext(Context);
  const [followStatus, setFollowStatus] = useState(status);

  if (loggedInUser) {
    if (loggedInUser._id == receiverUserId) {
      return null;
    }
  }

  return (
    <PrimaryButton
      style={{ flexDirection: "row" }}
      icon={followStatus ? <FaCheck /> : <RiUserFollowFill />}
      onClick={follow}
    >
      {followStatus ? "Following" : "Follow"}
    </PrimaryButton>
  );

  function follow() {
    if (!loggedInUser) return window.popupAlert("Login required");
    setFollowStatus(!followStatus);
    serverLine.post("/follow", {
      receiverUserId: receiverUserId,
      action: followStatus ? "UNFOLLOW" : "FOLLOW",
    });
  }
}

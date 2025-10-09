import { useContext, useState } from "react";
import styled from "styled-components";
import CustomButton from "../../helperComponents/CustomButton";
import { RiSendPlane2Line, RiSendPlaneLine } from "react-icons/ri";
import { serverLine } from "../../../controllers/network/serverLine";
import MaterialInput from "../../helperComponents/MaterialInput";
import { BeatLoader } from "react-spinners";
import Context from "../../../Context";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0;
  align-items: center;
  width: 100%;

  background: var(--surface);
  border: 1px solid var(--borderDim);
  border-radius: 10px;
  overflow: hidden;
`;

export default function MakeComment({
  contentId,
  rootCommentId,
  parentCommentId,
  onNewComment,
}) {
  const { loggedInUser } = useContext(Context);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!loggedInUser) return null;

  return (
    <Container>
      <MaterialInput
        label="Type comment here"
        value={text}
        onTextChange={setText}
        style={{
          background: "transparent",
          border: "none",
          borderRadius: "10px 0 0 10px",
        }}
      />
      <CustomButton
        style={{ background: "transparent", border: "none", padding: "0 20px" }}
        iconStyle={{ fontSize: "18px" }}
        onClick={comment}
        icon={
          loading ? (
            <BeatLoader color={"var(--element)"} size={"5px"} />
          ) : (
            <RiSendPlane2Line />
          )
        }
      ></CustomButton>
    </Container>
  );

  async function comment() {
    if (!text) return;
    if (!text.length) return null;
    if (loading) return false;
    setLoading(true);

    let theText = text;

    setText("");
    let newItem = await serverLine.post("/comment", {
      data: { text: theText },
      contentId,
      rootCommentId,
      parentCommentId,
    });

    onNewComment({
      data: { text: theText },
      myNewComment: true,
      _id: newItem._id,
      author: loggedInUser,
    });
    setLoading(false);
  }
}

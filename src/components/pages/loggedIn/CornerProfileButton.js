import { useContext } from "react";
import Context from "../../../Context.js";
import goTo from "../../../controllers/goTo.js";
import MiniProfileCard from "./MiniProfileCard.js";

export default function CornerProfileButton() {
  const { loggedInUser } = useContext(Context);
  if (!loggedInUser) return null;

  return <MiniProfileCard onClick={goTo("/options")} item={loggedInUser} />;
}

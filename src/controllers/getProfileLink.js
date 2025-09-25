import getHostName from "./getHostName";
import goTo from "./goTo";

export default function getProfileLink(username, suffix = "") {
  username = username.toLowerCase();

  return `/${username}${suffix}`;
}

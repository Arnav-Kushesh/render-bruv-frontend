import getHostName from "./getHostName";
import goTo from "./goTo";

export default function getContentLink(contentId) {
  return window.homeLink + `/content/` + contentId;
}

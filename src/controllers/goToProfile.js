import getHostName from "./getHostName";
import getProfileLink from "./getProfileLink";
import goTo from "./goTo";

export default function goToProfile(username, suffix = "", openInNewPage) {
  if (window.innerWidth < 900) openInNewPage = false;
  username = username.toLowerCase();

  return goTo(getProfileLink(username, suffix), {
    // isAbsolute: true,
    openInSamePage: openInNewPage ? false : true,
  });
}

import updateRouteState from "./updateRouteState";

export default function goTo(href, options = {}) {
  return () => {
    console.log("going to ", href);
    if (!options) options = {};
    let isAbsolute = options.isAbsolute ? true : false;
    let openInSamePage = options.openInSamePage ? true : false;
    let isReplace = options.isReplace ? true : false;

    if (href == -1) return window.history.back();

    if (!href) return window.doAlert("Link Not Available");

    if (isAbsolute && href.indexOf("http") === -1) {
      href = `https://${href}`;
    }

    if (isAbsolute || href.indexOf("http") !== -1) {
      if (openInSamePage) return (window.location = href);
      return window.open(href, openInSamePage ? false : "_blank");
    }

    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    let newState = {};

    updateRouteState(href);
    if (isReplace) {
      window.history.replaceState(newState, "", href);
    } else {
      window.history.pushState(newState, "", href);
    }
  };
}

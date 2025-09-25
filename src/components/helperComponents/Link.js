import goTo from "../../controllers/goTo";

export default function Link({ href, children }) {
  return <div onClick={onClick}>{children}</div>;

  function onClick() {
    // document.body.scrollTop = 0;
    // window.scrollTo(0, 0);
    goTo(href)();
  }
}

export default function parseScrollData({ target }) {
  return {
    scrollHeight: target.scrollHeight,
    scrollTop: target.scrollTop,
    clientHeight: target.clientHeight,
  };
}

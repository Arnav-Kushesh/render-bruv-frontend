export default function getLastSubPath(thePath) {
  if (!thePath) thePath = window.location.href;
  let split = thePath.split("/");
  return split[split.length - 1];
}

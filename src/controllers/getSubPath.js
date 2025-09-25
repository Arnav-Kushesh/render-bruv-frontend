export default function getSubPath(index, thePath) {
  if (!thePath) thePath = window.location.pathname;
  index = index + 1;
  let split = thePath.split("/");
  return split[index];
}

export default function getPopupType(pathName) {
  let pathSplit = pathName.split("/");
  // console.log(pathName, pathSplit);

  let firstSplit = pathSplit[1];
  if (!firstSplit) return false;
  if (firstSplit == "content") return "CONTENT";

  return false;
}

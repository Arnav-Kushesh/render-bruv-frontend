export default function GetArticleAndUserCardDimension() {
  let innerWidth = window.innerWidth;
  let width = null;
  let height = null;

  if (innerWidth > 900) {
    width = 635;
    height = 100;
  } else {
    width = "100%";
    height = 100;
  }

  return { width: width + "px", height: height + "px" };
}

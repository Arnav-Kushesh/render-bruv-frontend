import GetArticleAndUserCardDimension from "./GetArticleAndUserCardDimension";
import getBookCardDimension from "./getBookCardDimension";

export default function calculateFeedSettings({ type }) {
  let isMobile = window.innerWidth < 900;

  if (type == "BOOK") {
    let dimension = getBookCardDimension();

    if (isMobile) {
      return {
        columns: 2,
        itemsPerSlider: 4,
        shimmerWidth: dimension.width,
        shimmerHeight: dimension.height,
      };
    }

    return {
      columns: 5,
      itemsPerSlider: 5,
      shimmerWidth: dimension.width,
      shimmerHeight: dimension.height,
    };
  }

  if (type == "ARTICLE" || type == "USER") {
    let dimension = GetArticleAndUserCardDimension();

    if (isMobile)
      return {
        columns: 1,
        itemsPerSlider: 4,
        shimmerWidth: dimension.width,
        shimmerHeight: dimension.height,
      };
    return {
      columns: 2,
      itemsPerSlider: 6,
      shimmerWidth: dimension.width,
      shimmerHeight: dimension.height,
    };
  }
}

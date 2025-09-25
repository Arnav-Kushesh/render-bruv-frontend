export default function getLikeString(item) {
  if (window.nonReactLikeStatus) {
    if (window.nonReactLikeStatus[item._id]) {
      item = window.nonReactLikeStatus[item._id];
    }
  }

  item = { ...item };
  let likeDislikeRatio = 0;

  if (!item.likeCount) {
    item.likeCount = 0;
  }

  if (!item.dislikeCount) {
    item.dislikeCount = 0;
  }

  let totalLikeDislike = item.likeCount + item.dislikeCount;

  if (totalLikeDislike) {
    likeDislikeRatio = (item.likeCount / totalLikeDislike) * 100;
  }

  let percentage = "";

  if (likeDislikeRatio)
    percentage = `(
    ${likeDislikeRatio}%)`;

  return `${item.likeCount} Likes ${percentage}`;
}

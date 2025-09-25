export default function getOppositeMemberID(userIds, loggedInUserId) {
  loggedInUserId = loggedInUserId.toString();

  for (let item of userIds) {
    item = item.toString();
    if (item !== loggedInUserId) return item;
  }

  return null;
}

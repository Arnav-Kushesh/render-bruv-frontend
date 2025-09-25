export default function getFollowStatus(loggedInUser, userId) {
  let initialStatus = "NEGATIVE";
  if (!loggedInUser) return initialStatus;

  if (loggedInUser.followingUsers) {
    if (loggedInUser.followingUsers.includes(userId)) return "POSITIVE";
  }

  if (loggedInUser.followReqSent) {
    if (loggedInUser.followReqSent.includes(userId)) return "PENDING";
  }

  return initialStatus;
}

import parseExpiresAt from "./parseExpiresAt";

export default function getUserMembership({ user, membershipPlans }) {
  if (!user.membershipPlanID) return null;
  if (!user.membershipPlanValidity) return null;

  let expiry = parseExpiresAt(user.membershipPlanValidity);

  if (!expiry) return null;

  for (let item of membershipPlans) {
    if (item._id == user.membershipPlanID) return item;
  }

  return null;

  //membershipPlanValidity
}

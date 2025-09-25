import transformToIdValuePair from "./utils/transformToIdValuePair";

export default function getAfterDiscountPrice({
  user,
  total,
  membershipPlans,
}) {
  let membershipPlansDoc = transformToIdValuePair(membershipPlans);

  if (user.membershipPlanID) {
    let membership = membershipPlansDoc[user.membershipPlanID];

    if (membership) {
      if (membership.isRoyalty) {
        total = total * 0.85;
      }
    }
  }

  return total;
}

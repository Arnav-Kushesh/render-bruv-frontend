export default function getMembershipPlanName({
  membershipIdVsPlan,
  membershipPlanID,
}) {
  if (!membershipPlanID) return "NA";

  if (!membershipIdVsPlan[membershipPlanID]) {
    return "Undefined";
  }

  return membershipIdVsPlan[membershipPlanID].name;
}

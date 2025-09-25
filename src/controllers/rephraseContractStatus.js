export default function rephraseContractStatus(str) {
  if (str == "PENDING") return "Pending Acceptance";
  if (str == "ACCEPTED") return "Contract Accepted";
  if (str == "DECLINED") return "Contract Declined";
  if (str == "COMPLETED") return "Success";
  if (str == "FAILED") return "Failure";
  return str;
}

export default function limitStringLength(aString, maxLen = 50) {
  if (!aString) return "";
  if (aString.length < maxLen) return aString;

  if (typeof aString !== "string") return aString;

  return aString.substr(0, maxLen) + "...";
}

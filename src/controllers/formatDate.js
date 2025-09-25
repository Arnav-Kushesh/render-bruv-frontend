export default function formatDate(date, onlyMonth) {
  date = new Date(date);
  let options = { day: "numeric", month: "short", year: "numeric" };
  if (onlyMonth) options = { day: "numeric", month: "short" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
}

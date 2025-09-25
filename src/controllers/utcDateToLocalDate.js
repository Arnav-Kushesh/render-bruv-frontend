export default function utcDateToLocalDate(theDate) {
  let newDate = new Date(theDate);
  let theUtcDate = new Date(
    `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}T12:00:00Z`
  );

  let locale = theUtcDate.toLocaleString();

  return locale.split(",")[0];
}

export default function parseDateWithOnlyMonthAndYear(dateObj) {
  if (!dateObj) return "NA";
  dateObj = new Date(dateObj);

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day, month, and year from the date object
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  // Return the formatted string
  return `${month} ${year}`;
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function getDateString(key) {
  let today = new Date();

  let date = new Date(key);

  if (date.getFullYear() == today.getFullYear()) {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  } else {
    return `${date.getDate()} ${
      months[date.getMonth()]
    } ${today.getFullYear()}`;
  }
}

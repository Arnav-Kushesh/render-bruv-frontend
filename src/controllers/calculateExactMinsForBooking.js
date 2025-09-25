export default function calculateExactMinsForBooking({ divisions, mark }) {
  console.log("divisions", divisions);
  if (divisions <= 0) {
    divisions = 10;
    console.log(
      "Using default divisions in an hour. Please add slots per hour in admin panel"
    );
  }

  if (mark < 0 || mark >= divisions) {
    return "Timing has changed, please do re-booking";
  }

  let minute = Math.floor((mark * 60) / divisions);
  return minute < 10 ? `0${minute}` : `${minute}`;
}

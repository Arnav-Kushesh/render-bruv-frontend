import calculateExactMinsForBooking from "./calculateExactMinsForBooking";
import formatDate from "./formatDate";

export default function getDateAndTimeOfBooking({ activityType, bookingData }) {
  // console.log("activityType", activityType);
  // console.log("activityType", activityType.slotsPerHour);

  if (!activityType.slotsPerHour) {
    window.popupAlert(
      `${activityType.title} has missing slotsPerHour. Ask admin to fix it.`
    );
  }

  return `${formatDate(bookingData.date, true)} @ ${formatHour(bookingData.hour)}:${calculateExactMinsForBooking(
    {
      divisions: activityType.slotsPerHour,
      mark: bookingData.slot,
    }
  )}`;

  function formatHour(num) {
    if (num < 10) return `0${num}`;
    return num;
  }
}

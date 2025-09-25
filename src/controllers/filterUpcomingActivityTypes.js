export default function filterUpcomingActivityTypes(list) {
  if (!list) return [];
  let newList = [];

  for (let item of list) {
    let greenLight = hasFutureDate(item.dates);
    if (greenLight) newList.push(item);
  }

  return newList;
}

function hasFutureDate(dates) {
  if (!dates) return false;
  const today = new Date();
  return dates.some((date) => new Date(date) > today);
}

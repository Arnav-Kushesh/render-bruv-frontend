let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function getDayName(obj) {
  return day[obj.getDay()];
}

import reportReasons from "../../data/reportReasons";

export default function getReportOptions() {
  let list = [];

  for (let key in reportReasons) {
    list.push({
      value: key,
      label: reportReasons[key],
    });
  }

  return list;
}

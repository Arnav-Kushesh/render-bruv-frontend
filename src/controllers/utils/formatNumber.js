export default function formatNumber(num) {
  num = Math.round(num);
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

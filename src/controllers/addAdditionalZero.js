export default function addAdditionalZero(num) {
  num = num.toString();

  if (num.length == 1) return `0${num}`;
  return num;
}

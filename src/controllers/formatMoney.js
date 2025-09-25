import currencySymbol from "../data/currencySymbol";
import commaNumber from "comma-number";

export default function formatMoney(value, currency) {
  let theSymbol = currencySymbol[currency];
  return theSymbol + commaNumber(value);
}

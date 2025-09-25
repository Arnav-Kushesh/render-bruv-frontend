import countryCodeVsCountry from "../data/countryCodeVsCountry";

export default function getLocationString(user) {
  let theStr = "";

  if (!user.country) return null;

  theStr = `${countryCodeVsCountry[user.country]}`;

  if (!user.state) return theStr;

  theStr = `${user.state}, ${countryCodeVsCountry[user.country]}, `;

  if (!user.city) return theStr;

  return `${user.city}, ${user.state}, ${countryCodeVsCountry[user.country]}`;
}

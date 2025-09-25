export default function getHostName() {
  let hostName = window.location.host;
  let hostnameSplit = hostName.split(".");

  if (hostnameSplit.length >= 3) {
    let lastIndex = hostnameSplit.length - 1;
    return `${hostnameSplit[lastIndex - 1]}.${hostnameSplit[lastIndex]}`;
  } else {
    return hostName;
  }
}

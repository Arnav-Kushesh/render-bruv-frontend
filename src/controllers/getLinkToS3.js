export default function getLinkToS3(fileName) {
  let environment = "production";

  if (window.location.host.indexOf("localhost") !== -1) {
    environment = "development";
  }

  if (window.location.host.indexOf("192.168") !== -1) {
    environment = "development";
  }

  let useCDN = true;

  let base = "http://render-bruv-storage.s3.ap-south-1.amazonaws.com";

  let cdnBase = `https://d15o1m7yzzxruq.cloudfront.net`;

  if (useCDN) {
    base = cdnBase;
  }

  base = cdnBase;

  return `${base}/${environment}/render-bruv/${fileName}`;
}

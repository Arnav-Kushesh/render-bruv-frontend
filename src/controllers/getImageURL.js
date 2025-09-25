import getLinkToS3 from "./getLinkToS3.js";

export default function getImageURL(imageObject, isProfile) {
  if (typeof imageObject == "string")
    imageObject = { data: imageObject, type: "S3_UPLOAD" };

  if (!imageObject) return getDefaultImage();

  if (imageObject.type == "URL") {
    if (imageObject.data) return imageObject.data;
  } else if (imageObject.type == "S3_UPLOAD") {
    if (imageObject.data) return getLinkToS3(imageObject.data);
  } else if (imageObject.type == "LOCAL") {
    if (imageObject.data) return imageObject.data;
  } else if (imageObject.type == "UNSPLASH") {
    if (imageObject.data) return imageObject.data;
  } else if (imageObject.type == "DEFAULT") {
    return "/default/default-profile4.jpeg";
  } else {
    return getDefaultImage();
  }

  return getDefaultImage();

  function getDefaultImage() {
    if (isProfile) {
      return "/default/default-profile.jpg";
    } else {
      return "/defaultImage.png";
    }
  }
}

import { serverLine } from "./network/serverLine";

async function uploadFile(file) {
  console.log(file);

  if (!file.name) throw Error("File name is null");

  let fileSize = file.size;
  let fileNameSplit = file.name.split(".");
  let fileExtension = fileNameSplit[fileNameSplit.length - 1];

  let uploadSession = await serverLine.get(
    `/s3-upload-url/?fileSize=${fileSize}&fileExtension=${fileExtension}`
  );

  let { fileName, uploadURL } = uploadSession;

  await fetch(uploadURL, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });

  window.updateLoggedInUser();

  return { fileName };
}

export default uploadFile;

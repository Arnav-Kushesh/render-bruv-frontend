import compressFile from "./compressFile.js";
import selectFile from "./selectFile.js";
import uploadFile from "./uploadFile.js";

export default async function compressAndUploadFile(
  fileToUpdate,
  selectedFile,
  skipCompression
) {
  if (!selectedFile) {
    let files = await selectFile();
    // console.log("event---", files);
    if (!files) throw Error("File not selected");
    if (!files.length) throw Error("File not selected");
    selectedFile = files[0];
  }

  let compressedFile = selectedFile;
  if (!skipCompression) {
    compressedFile = await compressFile(selectedFile);
  }

  let fileData = await uploadFile(compressedFile, fileToUpdate);

  return fileData;
}

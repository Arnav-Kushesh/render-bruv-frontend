import compressFile from "./compressFile.js";
import selectFile from "./selectFile.js";
import uploadFile from "./uploadFile.js";

export default async function selectFileAndCheck() {
  let files = await selectFile();
  console.log("event---", files);
  if (!files) throw Error("File not selected");
  if (!files.length) throw Error("File not selected");
  return files[0];
}

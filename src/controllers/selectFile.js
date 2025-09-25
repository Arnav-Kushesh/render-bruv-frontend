async function selectFile(options) {
  if (!window.loggedInUser) {
    window.doAlert("Login Required");
    return null;
  }

  try {
      return await webFileSelector(options);
  
  } catch (e) {
    window.doAlert(e.message);
    return null;
  }
}



function webFileSelector(options) {
  return new Promise((resolve) => {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");

    fileInput.addEventListener("change", (e) => {
      resolve(e.target.files);
    });

    if (options) {
      if (options.onlyImage) {
        let acceptFiles = "image/png, image/gif, image/jpeg";
        fileInput.setAttribute("accept", acceptFiles);
      }

      if (options.allowMultipleFiles) fileInput.setAttribute("multiple", true);

      if (options.allowFolders) fileInput.setAttribute("webkitdirectory", true);
    }

    fileInput.click();
  });
}

export default selectFile;

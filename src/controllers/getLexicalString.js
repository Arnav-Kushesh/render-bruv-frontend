export default function getLexicalString(theObj) {
  let text = "";

  // console.log(theObj);

  if (theObj) {
    if (theObj.root) text += processElement(theObj.root);
  }

  return text;
}

function processElement(element) {
  let theText = "";

  if (element.children) {
    for (let item of element.children) {
      let output = processElement(item);
      if (output) theText += output + " ";
    }
  }

  if (element.type === "text") {
    let output = element.text;
    if (output) theText += output + " ";
  }

  return theText;
}

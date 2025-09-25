import { heIL } from "@mui/x-date-pickers";

export default function getBookCardDimension() {
  let innerWidth = window.innerWidth;
  let width = null;
  let height = null;

  if (innerWidth > 900) {
    width = 230;
    height = width * 1.5;
  } else {
    width = window.innerWidth - 20 * 3;
    width = width / 2;

    height = width * 1.5;
  }

  return { width: width + "px", height: height + "px", rawWidth: width };
}

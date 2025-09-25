import CustomButton from "../../../helperComponents/CustomButton";
import { serverLine } from "../../../../controllers/network/serverLine";
import contentCardButtonStyle from "../../../../data/contentCardButtonStyle";
import capitalizeFirstLetter from "../../../../controllers/capitalizeFirstLetter";

export default function ReportActionButton({ itemType, itemId, action }) {
  let theStyle = { ...contentCardButtonStyle };

  return (
    <CustomButton
      style={theStyle}
      onClick={like}
      iconStyle={{ fontSize: "20px" }}
    >
      {capitalizeFirstLetter(action.toLowerCase())}
    </CustomButton>
  );

  function like() {
    serverLine.post("/report-decision", { itemId, action, itemType });
    window.popupAlert("Done");
  }
}

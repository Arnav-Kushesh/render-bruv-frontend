import parseDate from "../../../controllers/parseDate";
import parseDateWithOnlyMonthAndYear from "../../../controllers/parseDateWithOnlyMonthAndYear";
import ElevatedSection from "../../helperComponents/general/ElevatedSection";
import MiniGapColumn from "../../helperComponents/general/MiniGapColumn";
import MiniGapRow from "../../helperComponents/general/MiniGapRow";
import CustomLabel from "../customLabel/CustomLabel";
import CustomLabelLarge from "../customLabel/CustomLabelLarge";

export default function CompanyStatCard({ item }) {
  return (
    <ElevatedSection>
      <MiniGapColumn>
        <CustomLabelLarge>{parseAmount()} </CustomLabelLarge>
        <MiniGapRow>
          <CustomLabel>
            {item.type == "AMOUNT_ADDED" ? "+" : "-"} {item?.user?.name}{" "}
          </CustomLabel>
          <CustomLabel>{parseDateOfItem(item.createdAt)} </CustomLabel>
        </MiniGapRow>
      </MiniGapColumn>
    </ElevatedSection>
  );

  function parseDateOfItem() {
    let theDate = new Date(item.date);

    if (item.durationType == "DATE") return parseDate(item.date);
    if (item.durationType == "MONTH")
      return parseDateWithOnlyMonthAndYear(item.date);

    if (item.durationType == "YEAR") return theDate.getFullYear();
  }

  function parseAmount() {
    let nonMoneyTypes = ["SIGNUP", "INSTANCE_CREATION", "INSTANCE_TERMINATION"];

    if (nonMoneyTypes.includes(item.type)) return item.amount;

    return `$` + item.amount / 100;
  }
}

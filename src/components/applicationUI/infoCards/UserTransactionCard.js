import parseDate from "../../../controllers/parseDate";
import ElevatedSection from "../../helperComponents/general/ElevatedSection";
import MiniGapColumn from "../../helperComponents/general/MiniGapColumn";
import MiniGapRow from "../../helperComponents/general/MiniGapRow";
import CustomLabel from "../customLabel/CustomLabel";
import CustomLabelLarge from "../customLabel/CustomLabelLarge";
import CustomLabelSmall from "../customLabel/CustomLabelSmall";

export default function UserTransactionCard({ item, showName }) {
  if (!item) return <ElevatedSection>Invalid Item</ElevatedSection>;
  return (
    <ElevatedSection style={{ padding: "15px" }}>
      <MiniGapColumn>
        <CustomLabelLarge>
          {item.type == "AMOUNT_ADDED" ? "+" : "-"} ${item.amountInCents / 100}{" "}
        </CustomLabelLarge>
        <MiniGapRow style={{ gap: "25px" }}>
          {showName && <CustomLabelSmall>{item?.user?.name} </CustomLabelSmall>}
          <CustomLabelSmall>{parseDate(item.createdAt)} </CustomLabelSmall>
        </MiniGapRow>
      </MiniGapColumn>
    </ElevatedSection>
  );
}

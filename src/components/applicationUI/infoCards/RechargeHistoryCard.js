import parseDate from "../../../controllers/parseDate";
import ElevatedSection from "../../helperComponents/general/ElevatedSection";
import MiniGapColumn from "../../helperComponents/general/MiniGapColumn";
import MiniGapRow from "../../helperComponents/general/MiniGapRow";
import CustomLabel from "../customLabel/CustomLabel";
import CustomLabelLarge from "../customLabel/CustomLabelLarge";

export default function RechargeHistoryCard({ item }) {
  if (!item) return <ElevatedSection>Invalid Item</ElevatedSection>;
  return (
    <ElevatedSection>
      <MiniGapColumn>
        <CustomLabelLarge>${item.amountInCents / 100} </CustomLabelLarge>
        <MiniGapRow>
          {/* <CustomLabel>{item?.user?.name} </CustomLabel> */}
          <CustomLabel>{parseDate(item.createdAt)} </CustomLabel>
        </MiniGapRow>
      </MiniGapColumn>
    </ElevatedSection>
  );
}

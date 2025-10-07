import parseDate from "../../../controllers/parseDate";
import ElevatedSection from "../../helperComponents/general/ElevatedSection";
import MiniGapColumn from "../../helperComponents/general/MiniGapColumn";
import MiniGapRow from "../../helperComponents/general/MiniGapRow";
import CustomLabel from "../customLabel/CustomLabel";
import CustomLabelExtraSmall from "../customLabel/CustomLabelExtraSmall";
import CustomLabelLarge from "../customLabel/CustomLabelLarge";
import CustomLabelSmall from "../customLabel/CustomLabelSmall";

export default function CompanyTransactionCard({ item }) {
  if (!item) return <ElevatedSection>Invalid Item</ElevatedSection>;
  return (
    <ElevatedSection>
      <MiniGapColumn>
        <CustomLabelLarge>${item.amountInCents / 100} </CustomLabelLarge>
        <CustomLabelSmall>{item.type} </CustomLabelSmall>

        <CustomLabelExtraSmall>
          {item?.user?.name} @{parseDate(item.createdAt)}{" "}
        </CustomLabelExtraSmall>
      </MiniGapColumn>
    </ElevatedSection>
  );
}

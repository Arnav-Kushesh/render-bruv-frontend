import { useMemo, useState } from "react";

import DataAggregator from "../dataAggregator/DataAggregator";
import ContentCard from "../../pages/loggedIn/content/ContentCard";
import DropDownInput from "../../helperComponents/DropDownInput";
import companyStatTypes from "../../../data/money/companyStatTypes";
import companyStatDurationTypes from "../../../data/money/companyStatDurationTypes";
import CompanyStatCard from "../infoCards/CompanyStatCard";

let columnNames = [
  { label: "Period", value: "date" },
  { label: "Amount", value: "amount" },
  {
    label: "Dollars",
    processFunction: (item) => {
      if (item.type == "SIGNUP") return "NA";
      if (item.type == "INSTANCE_CREATION") return "NA";
      if (item.type == "INSTANCE_TERMINATION") return "NA";

      return item.amount / 100;
    },
  },
];

export default function StatAggregator({
  columns = 1,
  typeOverride,
  durationTypeOverride,
  hideTitleSection,
  nothingFoundMessage,
  disableFilters,
  onCardClick,
  tableViewSettings,
  showReportedItems,
  viewMode,
  userId,
  processAmount,
}) {
  const [type, setType] = useState(null);
  const [durationType, setDurationType] = useState(null);

  const queryParams = useMemo(
    () => ({
      userId: userId,
      type: typeOverride ? typeOverride : type,
      durationType: durationTypeOverride ? durationTypeOverride : durationType,
    }),
    [type, durationType, durationTypeOverride, typeOverride, userId]
  );

  return (
    <DataAggregator
      processAmount={processAmount}
      viewMode={viewMode}
      showReportedItems={showReportedItems}
      hideTitleSection={hideTitleSection}
      tableViewSettings={
        tableViewSettings ? tableViewSettings : { columns: columnNames }
      }
      onCardClick={onCardClick}
      disableFilters={disableFilters}
      inheritedSearchQuery={null}
      nothingFoundMessage={nothingFoundMessage}
      columns={columns}
      disableSearch={true}
      doReset={() => {
        setType(null);
      }}
      queryParams={queryParams}
      filters={
        <>
          <DropDownInput
            label="Type"
            value={type}
            options={companyStatTypes}
            onChange={setType}
          />

          <DropDownInput
            label="Duration Type"
            value={durationType}
            options={companyStatDurationTypes}
            onChange={setDurationType}
          />
        </>
      }
      title="Company Stat"
      path="stat"
      CardComponent={CompanyStatCard}
    />
  );
}

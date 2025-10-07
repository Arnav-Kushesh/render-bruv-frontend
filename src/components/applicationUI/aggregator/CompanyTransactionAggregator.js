import { useMemo, useState } from "react";

import DataAggregator from "../dataAggregator/DataAggregator";
import ContentCard from "../../pages/loggedIn/content/ContentCard";
import DropDownInput from "../../helperComponents/DropDownInput";
import companyTransactionTypes from "../../../data/money/companyTransactionTypes";
import parseDate from "../../../controllers/parseDate";
import CompanyTransactionCard from "../infoCards/CompanyTransactionCard";

let columnNames = [
  { label: "Type", value: "type" },
  {
    label: "Date",
    processFunction: (item) => {
      return parseDate(item.createdAt);
    },
  },
  {
    label: "Dollars",
    processFunction: (item) => {
      return item.amount / 100;
    },
  },
];

export default function CompanyTransactionAggregator({
  columns = 1,
  typeOverride,
  hideTitleSection,
  nothingFoundMessage,
  disableFilters,
  onCardClick,
  tableViewSettings,
  showReportedItems,
  viewMode,
}) {
  const [type, setType] = useState(null);

  const queryParams = useMemo(
    () => ({
      type: typeOverride ? typeOverride : type,
    }),
    [type, typeOverride]
  );

  return (
    <DataAggregator
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
            options={companyTransactionTypes}
            onChange={setType}
          />
        </>
      }
      title="Company Transactions"
      path="company-transactions"
      CardComponent={CompanyTransactionCard}
    />
  );
}

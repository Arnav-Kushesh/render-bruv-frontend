import { useMemo, useState } from "react";

import DataAggregator from "../dataAggregator/DataAggregator";
import contentPurposes from "../../../data/contentPurposeTypes";
import ContentCard from "../../pages/loggedIn/content/ContentCard";
import DropDownInput from "../../helperComponents/DropDownInput";

export default function ContentAggregator({
  columns = 1,
  userId,
  purposeOverride,
  hideTitleSection,
  nothingFoundMessage,
  disableFilters,
  inheritedSearchQuery,
  onCardClick,
  tableViewSettings,
  showReportedItems,
  viewMode,
}) {
  const [purpose, setPurpose] = useState("");

  const queryParams = useMemo(
    () => ({
      userId,

      purpose: purposeOverride ? purposeOverride : purpose,
    }),
    [userId, purpose, purposeOverride]
  );

  return (
    <DataAggregator
      viewMode
      showReportedItems={showReportedItems}
      hideTitleSection={hideTitleSection}
      tableViewSettings={tableViewSettings}
      onCardClick={onCardClick}
      disableFilters={disableFilters}
      inheritedSearchQuery={inheritedSearchQuery}
      nothingFoundMessage={nothingFoundMessage}
      columns={columns}
      doReset={() => {
        setPurpose(null);
      }}
      queryParams={queryParams}
      filters={
        <>
          <DropDownInput
            disableSearch={true}
            label="Purpose"
            value={purpose}
            options={contentPurposes}
            onChange={setPurpose}
          />
        </>
      }
      title="Posts"
      path="feed"
      CardComponent={ContentCard}
    />
  );
}

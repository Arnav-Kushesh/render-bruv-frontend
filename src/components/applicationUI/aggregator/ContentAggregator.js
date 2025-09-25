import { useMemo, useState } from "react";

import DataAggregator from "../dataAggregator/DataAggregator";
import ngoTypes from "../../../data/ngoTypes";
import contentPurposes from "../../../data/contentPurposeTypes";
import ContentCard from "../../pages/loggedIn/content/ContentCard";
import DropDownLocationInput from "../../helperComponents/DropDownLocationInput";
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
}) {
  const [type, setType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const queryParams = useMemo(
    () => ({
      userId,
      city,
      state,
      purpose: purposeOverride ? purposeOverride : purpose,
      type,
    }),
    [userId, type, purpose, state, city, purposeOverride]
  );

  return (
    <DataAggregator
      showReportedItems={showReportedItems}
      hideTitleSection={hideTitleSection}
      tableViewSettings={tableViewSettings}
      onCardClick={onCardClick}
      disableFilters={disableFilters}
      inheritedSearchQuery={inheritedSearchQuery}
      nothingFoundMessage={nothingFoundMessage}
      columns={columns}
      doReset={() => {
        setType(null);
        setPurpose(null);
        setState(null);
        setCity(null);
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

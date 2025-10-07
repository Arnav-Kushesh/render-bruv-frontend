import { useMemo, useState } from "react";

import DataAggregator from "../dataAggregator/DataAggregator";

import ngoTypes from "../../../data/ngoTypes";
import ProfileCard from "../../pages/loggedIn/profiles/ProfileCard";
import DropDownInput from "../../helperComponents/DropDownInput";
import DropDownLocationInput from "../../helperComponents/DropDownLocationInput";

export default function ProfileAggregator({
  columns = 1,
  nothingFoundMessage,
  disableFilters,
  inheritedSearchQuery,
  onCardClick,
  hideTitleSection,
  topUsersListForAdmin,
  ItemCard,
  viewMode,
  showReportedItems,
  tableViewSettings,
}) {
  //Will add parameters in the future
  const queryParams = useMemo(
    () => ({ topUsersListForAdmin }),
    [topUsersListForAdmin]
  );

  return (
    <DataAggregator
      viewMode={viewMode}
      tableViewSettings={tableViewSettings}
      showReportedItems={showReportedItems}
      hideTitleSection={hideTitleSection}
      onCardClick={onCardClick}
      disableFilters={disableFilters}
      inheritedSearchQuery={inheritedSearchQuery}
      nothingFoundMessage={nothingFoundMessage}
      columns={columns}
      doReset={() => {
        //To do
      }}
      queryParams={queryParams}
      filters={<>{/* Todo */}</>}
      title="Accounts"
      path="profiles"
      CardComponent={ItemCard ? ItemCard : ProfileCard}
    />
  );
}

import { useMemo, useState } from "react";

import DataAggregator from "../dataAggregator/DataAggregator";

import ngoTypes from "../../../data/ngoTypes";
import ProfileCard from "../../pages/loggedIn/profiles/ProfileCard";
import DropDownInput from "../../helperComponents/DropDownInput";
import DropDownLocationInput from "../../helperComponents/DropDownLocationInput";
import ProjectCard from "../../pages/loggedIn/home/ProjectCard";
import AnimatedPillTabs from "../../pages/loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs";

export default function ServerInstanceAggregator({
  columns = 1,
  nothingFoundMessage,
  disableFilters,
  inheritedSearchQuery,
  onCardClick,
  hideTitleSection,

  ItemCard,
  viewMode,
  showReportedItems,
}) {
  const [status, setStatus] = useState("RUNNING");
  //Will add parameters in the future
  const queryParams = useMemo(() => ({ status }), [status]);

  return (
    <DataAggregator
      viewMode={viewMode}
      showReportedItems={showReportedItems}
      // hideTitleSection={true}
      onCardClick={onCardClick}
      disableFilters={disableFilters}
      inheritedSearchQuery={inheritedSearchQuery}
      nothingFoundMessage={nothingFoundMessage}
      disableSearch={true}
      overrideCardStyle={{ width: "100%" }}
      columns={columns}
      doReset={() => {
        //To do
      }}
      queryParams={queryParams}
      filters={
        <>
          {
            <AnimatedPillTabs
              tabs={[
                { value: "RUNNING", label: "Running" },
                { value: "TERMINATED", label: "Terminated" },
              ]}
              value={status}
              onChange={setStatus}
            />
          }
        </>
      }
      title="Servers"
      path="server-instances"
      CardComponent={ItemCard ? ItemCard : ProjectCard}
    />
  );
}

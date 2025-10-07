import ProfileAggregator from "../../../../applicationUI/aggregator/ProfileAggregator";

export default function AdminTopUsers() {
  return (
    <ProfileAggregator
      columns={1}
      viewMode={"TABLE"}
      hideTitleSection={true}
      tableViewSettings={{
        columns: [
          { label: "Name", value: "name" },
          { label: "Total Minutes Used", value: "totalMinutesUsed" },
          { label: "Signup Source", value: "signupSource" },
          { label: "Use Case", value: "useCase" },
        ],
      }}
    />
  );
}

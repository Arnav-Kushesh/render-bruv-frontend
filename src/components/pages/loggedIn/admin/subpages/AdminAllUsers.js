import ProfileAggregator from "../../../../applicationUI/aggregator/ProfileAggregator";

export default function AdminAllUsers() {
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
          { label: "Experience", value: "experience" },
          { label: "Email", value: "email" },
        ],
      }}
    />
  );
}

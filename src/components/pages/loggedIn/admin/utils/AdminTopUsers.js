import ProfileAggregator from "../../../../applicationUI/aggregator/ProfileAggregator";

export default function AdminTopUsers() {
  return (
    <ProfileAggregator
      columns={2}
      topUsersListForAdmin={true}
      hideTitleSection={true}
    />
  );
}

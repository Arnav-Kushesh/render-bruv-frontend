import CardForItemCompact from "../../../applicationUI/CardForItemCompact";
import goTo from "../../../../controllers/goTo";
import MessageBox from "../../../helperComponents/MessageBox";
import styled from "styled-components";

const ReportSectionButtons = styled.div``;

export default function ProfileCard({ data, onCardClick, forReportPurposes }) {
  if (!onCardClick) onCardClick = goTo(`/u/${data.username}`);

  if (data.isBanned) {
    return <MessageBox>This profile is banned</MessageBox>;
  }

  let attachedComponent = null;

  return (
    <CardForItemCompact
      attachedComponent={attachedComponent}
      data={data}
      onCardClick={() => {
        onCardClick(data);
      }}
      isProfile={true}
      image={data.profileImage}
      itemType={"PROFILE"}
      itemId={data._id}
      title={`${data.name}`}
      line1={
        data.bio && [
          {
            text: `${data.bio}`,
          },
        ]
      }
    />
  );
}

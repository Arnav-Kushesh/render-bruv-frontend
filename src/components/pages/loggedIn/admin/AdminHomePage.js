import { useContext, useState } from "react";
import adminAccess from "../../../../data/adminAccess";
import MessageBox from "../../../helperComponents/MessageBox";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import Context from "../../../../Context";
import AnimatedPillTabs from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs";
import styled from "styled-components";
import AdminAccounting from "./utils/AdminAccounting";
import AdminCompanyStat from "./utils/AdminCompanyStat";
import AdminTopUsers from "./utils/AdminTopUsers";
import AdminLiveServers from "./utils/AdminServers";
import AdminAllCompanyTransactions from "./utils/AdminAllCompanyTransactions";
import AdminAllUserTransactions from "./utils/AdminAllUserTransactions";
import ManageModeratorList from "./utils/ManageModeratorList";
import ReportedItemsList from "../report/ReportedItemsList";
import CustomLabel from "../../../applicationUI/CustomLabel";
import AdminServers from "./utils/AdminServers";
import AdminAllUsers from "./utils/AdminAllUsers";
import AnimatedPillTabsVertical from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabsVertical";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const tabs = [
  { value: "ACCOUNTING", label: "Accounting", component: <AdminAccounting /> },
  {
    value: "COMPANY_STATS",
    label: "Company Stats",
    component: <AdminCompanyStat />,
  },
  { value: "TOP_USERS", label: "Top Users", component: <AdminTopUsers /> },
  { value: "All_USERS", label: "Users", component: <AdminAllUsers /> },
  {
    value: "SERVERS",
    label: "Servers",
    component: <AdminServers />,
  },
  {
    value: "All_COMPANY_TRANSACTIONS",
    label: "Company Transactions",
    component: <AdminAllCompanyTransactions />,
  },
  {
    value: "ALL_USER_TRANSACTIONS",
    label: "User Transactions",
    component: <AdminAllUserTransactions />,
  },
  {
    value: "MANAGE_MODERATORS",
    label: "Moderators",
    component: <ManageModeratorList />,
  },
  {
    value: "REPORTED_ISSUES",
    label: "Issues",
    component: <AdminAccounting />,
  },
  {
    value: "REPORTED_POSTS",
    label: "Reported",
    component: <ReportedItemsList />,
  },
];

const MainTitle = styled.div``;

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  padding: 15px;
  background-color: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 15px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default function AdminHomePage() {
  const { loggedInUser, moderatorList } = useContext(Context);
  const [type, setType] = useState("ACCOUNTING");

  if (!loggedInUser)
    return (
      <LoggedInBoilerplate>
        <MessageBox>Permission Denied</MessageBox>
      </LoggedInBoilerplate>
    );

  if (
    !adminAccess.includes(loggedInUser.username) &&
    !moderatorList.includes(loggedInUser.username)
  ) {
    return (
      <LoggedInBoilerplate>
        <MessageBox>Permission Denied</MessageBox>
      </LoggedInBoilerplate>
    );
  }

  return (
    <LoggedInBoilerplate>
      <Container>
        <CustomLabel> Admin Page</CustomLabel>

        <Row>
          <AnimatedPillTabsVertical
            containerStyle={{ width: "250px" }}
            tabs={tabs}
            onChange={setType}
            value={type}
          />
          <MainContent>{getMainContent()}</MainContent>
        </Row>
      </Container>
    </LoggedInBoilerplate>
  );

  function getMainContent() {
    for (let item of tabs) {
      if (item.value == type) return item.component;
    }
  }
}

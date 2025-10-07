import { useContext, useState } from "react";
import adminAccess from "../../../../data/adminAccess";
import MessageBox from "../../../helperComponents/MessageBox";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import Context from "../../../../Context";
import styled from "styled-components";
import AdminAccounting from "./subpages/AdminAccounting";
import AdminTopUsers from "./subpages/AdminTopUsers";
import AdminAllCompanyTransactions from "./subpages/AdminAllCompanyTransactions";
import AdminAllUserTransactions from "./subpages/AdminAllUserTransactions";
import ManageModeratorList from "./subpages/ManageModeratorList";
import ReportedItemsList from "../report/ReportedItemsList";
import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";
import AdminServers from "./subpages/AdminServers";
import AdminAllUsers from "./subpages/AdminAllUsers";
import AnimatedPillTabsVertical from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabsVertical";
import AdminRevenueStat from "./subpages/AdminRevenueStat";
import AdminInstanceStat from "./subpages/AdminInstanceStat";
import AdminSignupStat from "./subpages/AdminSignupStat";
import AdminExpenseStat from "./subpages/AdminExpenseStat";
import AdminProfitStat from "./subpages/AdminProfitStat";
import ContentAggregator from "../../../applicationUI/aggregator/ContentAggregator";
import IssuePostList from "./subpages/IssuePostList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const tabs = [
  { value: "ACCOUNTING", label: "Accounting", component: <AdminAccounting /> },
  {
    value: "REVENUE_STAT",
    label: "Revenue Stats",
    component: <AdminRevenueStat />,
  },
  {
    value: "PROFIT_STAT",
    label: "Profit Stats",
    component: <AdminProfitStat />,
  },
  {
    value: "EXPENSE_STAT",
    label: "Expense Stats",
    component: <AdminExpenseStat />,
  },
  {
    value: "SIGNUP_STAT",
    label: "Signup Stats",
    component: <AdminSignupStat />,
  },
  {
    value: "INSTANCE_STAT",
    label: "Instance Stats",
    component: <AdminInstanceStat />,
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
    component: <IssuePostList />,
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
  /* padding: 15px; */
  /* background-color: var(--surface2); */
  /* border: 1px solid var(--border); */
  border-radius: 15px;
  padding: 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
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

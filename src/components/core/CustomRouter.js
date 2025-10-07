import { useContext } from "react";
import EntryPage from "./routes/EntryPage.js";

import Context from "../../Context.js";
import getPopupType from "../../controllers/getPopupType.js";
import styled from "styled-components";

import PageNotFound from "../helperComponents/PageNotFound.js";
import ForgotPassword from "../pages/loggedOut/auth/ForgotPassword.js";
import ChangePassword from "../pages/loggedOut/auth/ChangePassword.js";

import LoginWall from "../pages/loggedIn/LoginWall.js";
import TermsAndCondition from "../pages/footerPages/TermsAndCondition.js";
import PrivacyPolicy from "../pages/footerPages/PrivacyPolicy.js";
import RefundPolicy from "../pages/footerPages/RefundPolicy.js";
import VerifyEmail from "../pages/loggedIn/onboarding/VerifyEmail.js";

import DeleteAccount from "../pages/deleteAccount/DeleteAccount.js";
import LoginWithOTP from "../pages/loggedOut/auth/LoginWithOTP.js";
import GenerateOTP from "../pages/loggedOut/auth/GenerateOTP.js";
import LoginPage from "../pages/loggedOut/auth/LoginPage.js";
import AskName from "../pages/loggedIn/onboarding/AskName.js";
import AskUsername from "../pages/loggedIn/onboarding/AskUsername.js";
import OptionsPage from "../pages/loggedIn/settings/OptionsPage.js";
import NotificationsPage from "../pages/loggedIn/notifications/NotificationsPage.js";
import SelectContentType from "../pages/loggedIn/SelectContentType.js";
import AccountsPage from "../pages/loggedIn/AccountsPage.js";
import ReportItem from "../pages/loggedIn/report/ReportItem.js";
import ReportedItemsList from "../pages/loggedIn/report/ReportedItemsList.js";

import AddOrEditContent from "../pages/loggedIn/content/AddOrEditContent.js";
import ContentPage from "../pages/loggedIn/content/ContentPage.js";
import ProfilePage from "../pages/loggedIn/profiles/ProfilePage.js";
import ManageInstance from "../pages/loggedIn/instance/ManageInstance.js";
import ManageBillingPage from "../pages/loggedIn/billingPage/ManageBillingPage.js";
import CommunityPage from "../pages/loggedIn/communityPage/CommunityPage.js";
import ProfileEditOptions from "../pages/loggedIn/ProfileEditOptions.js";
import AskBio from "../pages/loggedIn/onboarding/AskBio.js";
import AskGender from "../pages/loggedIn/onboarding/AskGender.js";
import ManageModeratorList from "../pages/loggedIn/admin/subpages/ManageModeratorList.js";
import AdminHomePage from "../pages/loggedIn/admin/AdminHomePage.js";
import VerifyPayment from "../pages/loggedIn/money/VerifyPayment.js";
import PaymentDone from "../pages/loggedIn/money/PaymentDone.js";

const Container = styled.div`
  /* min-height: 100%; */ //don't enable this, it prevents the scroll from the working that is assigned in the boilerplate
  //especially for the logged out page

  /* overflow-y: scroll; */
  /* height: calc(100dvh - var(--safe-area-inset-top)); */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  /* @media (max-width: 900px) {
    width: 100vw;
  } */
`;

let pathVsComp = {
  "/": <EntryPage />,
  "/admin-page": <AdminHomePage />,
  //Auth"

  "/edit-profile-options": <ProfileEditOptions />,
  "/manage-instance": <ManageInstance />,
  "/manage-billing": <ManageBillingPage />,
  "/notifications": <NotificationsPage />,
  "/options": <OptionsPage />,
  "/community": <CommunityPage />,

  "/auth": <LoginPage />,
  "/forgot-password": <ForgotPassword />,
  "/change-password": <ChangePassword />,

  "/delete-account": <DeleteAccount />,
  "/generate-otp": <GenerateOTP />,
  "/login-with-otp": <LoginWithOTP />,

  "/accounts": <AccountsPage />,
  "/report": <ReportItem />,
  "/reported-items": <ReportedItemsList />,

  "/manage-moderators": <ManageModeratorList />,

  "/select-post-type": <SelectContentType />,
  "/manage-post": <AddOrEditContent />,

  "/p": <ContentPage />, //Post page
  "/u": <ProfilePage />,

  //Footer Pages
  "/confirm-email": <VerifyEmail />,
  "/terms-and-conditions": <TermsAndCondition />,
  "/privacy-policy": <PrivacyPolicy />,
  "/refund-policy": <RefundPolicy />,

  //Edit Pages
  "/edit-gender": <AskGender asEditPage={true} />,
  "/edit-bio": <AskBio asEditPage={true} />,
  "/edit-name": <AskName asEditPage={true} />,
  "/edit-username": <AskUsername asEditPage={true} />,

  //Money
  "/verify-payment": <VerifyPayment />,
  "/payment-done": <PaymentDone />,
};

let loginNotRequiredPages = [
  "/",
  "/u",
  "/p",
  "/confirm-email",

  "/auth-redirect",
  "/auth",

  "/signup",
  "/forgot-password",

  "/change-password",
  "/privacy-policy",

  "/terms-and-conditions",
  "/refund-policy",

  "/generate-otp",
  "/login-with-otp",
];

export default function CustomRouter() {
  const { currentRoute, nonPopupRoute, loggedInUserId } = useContext(Context);

  let popupComp = null;
  let baseComp = findCompOfPath(currentRoute);

  let popupType = getPopupType(currentRoute);

  if (popupType && nonPopupRoute) {
    if (currentRoute !== nonPopupRoute) {
      baseComp = findCompOfPath(nonPopupRoute);
      popupComp = getPopupComp(currentRoute);
    }
  }

  let containerStyle = null;

  if (popupComp) {
    containerStyle = { display: "none" };
  }

  return (
    <>
      <Container style={containerStyle}>
        {baseComp ? baseComp : <PageNotFound />}
      </Container>
      {popupComp}
    </>
  );

  function findCompOfPath(pathToScan) {
    pathToScan = pathToScan.split("?")[0];

    //Remove last slash
    let lastItem = pathToScan[pathToScan.length - 1];
    if (lastItem == "/" && pathToScan !== "/")
      pathToScan = pathToScan.slice(0, pathToScan.length - 1);

    if (pathToScan == "/") return pathVsComp["/"];

    let matchedComponents = [];
    let pathToScanSplit = pathToScan.split("/");
    if (pathToScanSplit.length <= 1) return null;
    //the first item is null. So we need path with at least a length of 2

    /*
    Explanation of the following code

    Let's say the path is /part1/part2/part3

    the following code first check /part1
    then checks /part1/part2
    then checks /part1/part2/part3

    all of the is put in an array
    the array is reversed
    & we just use first match from the reversed array


 */

    for (let i = 1; i < pathToScanSplit.length; i++) {
      // console.log("i", i);

      if (i === 1) {
        let subPathString = pathToScanSplit[i];

        // console.log("subPathString 1", subPathString);

        let matchedComp = pathVsComp["/" + subPathString];
        if (matchedComp) {
          matchedComponents.push(matchedComp);
        }
      } else {
        let subPathArray = [];

        for (let j = 1; j <= i; j++) {
          subPathArray.push(pathToScanSplit[j]);
        }
        let pathString = subPathArray.join("/");

        let matchedComp = pathVsComp["/" + pathString];
        if (matchedComp) {
          matchedComponents.push(matchedComp);
        }
      }
    }

    let baseRoute = "/" + pathToScan.split("/")[1];

    if (matchedComponents.length) {
      if (!loginNotRequiredPages.includes(baseRoute)) {
        if (!loggedInUserId) {
          return <LoginWall />;
        }
      }
    }

    if (!matchedComponents.length) {
      return null;
    }

    matchedComponents.reverse();

    return matchedComponents[0];
  }

  function getPopupComp(pathName) {
    return false;
  }
}

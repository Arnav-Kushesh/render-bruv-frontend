import AskName from "../components/pages/loggedIn/onboarding/AskName";
import VerifyEmail from "../components/pages/loggedIn/onboarding/VerifyEmail";

// helper
const skipped = (user, field) => user?.[field] === true;

export function getOnboardingComponent(loggedInUser) {
  if (!loggedInUser) return null;

  // 1. Verify email first
  if (!loggedInUser.emailConfirmed) {
    return <VerifyEmail />;
  }

  if (!loggedInUser.name && !skipped(loggedInUser, "nameOnboardingSkipped")) {
    return <AskName />;
  }

  return null;
}

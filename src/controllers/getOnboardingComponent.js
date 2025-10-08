import AskExperience from "../components/pages/loggedIn/onboarding/AskExperience";
import AskName from "../components/pages/loggedIn/onboarding/AskName";
import AskSignupSource from "../components/pages/loggedIn/onboarding/AskSignupSource";
import AskUseCase from "../components/pages/loggedIn/onboarding/AskUseCase";
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

  if (
    !loggedInUser.signupSource &&
    !skipped(loggedInUser, "signupSourceOnboardingSkipped")
  ) {
    return <AskSignupSource />;
  }

  if (
    !loggedInUser.useCase &&
    !skipped(loggedInUser, "useCaseOnboardingSkipped")
  ) {
    return <AskUseCase />;
  }

  if (
    !loggedInUser.experience &&
    !skipped(loggedInUser, "experienceOnboardingSkipped")
  ) {
    return <AskExperience />;
  }

  return null;
}

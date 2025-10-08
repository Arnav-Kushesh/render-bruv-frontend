import styled from "styled-components";
import BrandContainer from "../../../brand/BrandContainer";
import WithBackground from "../../../core/boilerplate/WithBackground";
import LoadingSection from "../../../helperComponents/LoadingSection";
import OnBoardingCore from "../../../helperComponents/OnBoardingCore";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import BrandContainerThemed2d from "../../../brand/BrandContainerThemed2d";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  height: 100dvh;
  overflow: hidden;
  overflow-y: scroll;
  padding: 100px;
  width: 100vw;

  @media (max-width: 900px) {
    padding: 25px;
    margin-top: 20px;
  }
`;

export default function OnboardingBoilerplate({
  asEditPage,
  editPageTitle,
  children,
  onSubmit,
  title,
  desc,
  submitButtonText,
  loading,
  desktopWidth,
  skipID,
  disableSkip,
}) {
  if (loading) {
    children = <LoadingSection />;
    onSubmit = null;
  }

  if (asEditPage) {
    return (
      <LoggedInBoilerplate
        showBackButton={true}
        titleLine1={"Edit"}
        titleLine2={editPageTitle}
      >
        <OnBoardingCore
          asEditPage={asEditPage}
          desktopWidth={desktopWidth}
          title={title}
          desc={desc}
          onSubmit={onSubmit}
          skipID={skipID}
          disableSkip={disableSkip}
          submitButtonText={submitButtonText ? submitButtonText : "Submit"}
        >
          {children}
        </OnBoardingCore>
      </LoggedInBoilerplate>
    );
  }

  return (
    <WithBackground>
      <Container>
        <BrandContainerThemed2d />
        <OnBoardingCore
          desktopWidth={desktopWidth}
          title={title}
          desc={desc}
          onSubmit={onSubmit}
          skipID={skipID}
          disableSkip={disableSkip}
          submitButtonText={submitButtonText ? submitButtonText : "Submit"}
        >
          {children}
        </OnBoardingCore>
        {/* <CustomButton
          style={{ opacity: 0.3 }}
          variant="minimal"
          underlined={true}
          onClick={logout}
        >
          {t("logout")}
        </CustomButton> */}
      </Container>
    </WithBackground>
  );
}

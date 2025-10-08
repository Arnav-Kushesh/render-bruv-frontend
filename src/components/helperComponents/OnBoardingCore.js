import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
import CustomButton from "./CustomButton";
import { serverLine } from "../../controllers/network/serverLine";
import { useContext } from "react";
import Context from "../../Context";
import CustomPrimaryButton from "./CustomPrimaryButton";

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
  align-items: center;
  padding: 30px;
  width: 430px;
  height: auto;
  border-radius: 10px;

  padding-bottom: 50px;

  /* background: #111 !important; */

  ${({ desktopWidth }) => {
    if (desktopWidth) return `width:${desktopWidth};`;
  }}

  /* animation: centerScaleReveal 0.4s ease-in; */

  @media (max-width: 900px) {
    width: 100% !important;
    padding: 10px;
    padding-bottom: 30px;
    background-color: transparent;
    box-shadow: none;
    /* height: 75vh; */
    border: none;
    justify-content: center;
  }
`;

const Title = styled.div`
  font-weight: 700;
  justify-content: center;
  text-align: center;
  font-size: 17px;
  color: var(--element);
  text-transform: capitalize;
  margin-top: 20px;

  font-family: "Montserrat", sans-serif;
`;

const Medium = styled.div`
  /* font-weight: 900; */
  opacity: 0.6;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: var(--element);
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin-bottom: 10px;

  @media (max-width: 900px) {
    padding-bottom: 100px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;

  @media (max-width: 900px) {
    margin: 0;
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: -5px;
    left: 0;
    z-index: 55;
    width: 100vw;
    justify-content: space-between;
    padding: 10px;
    padding-bottom: 20px;
    background: var(--mainBackground);
    box-shadow: 0 0 10px 10px var(--mainBackground);
  }
`;

const Underline = styled.div`
  height: 2px;
  border-radius: 5px;
  margin-top: -5px;
  width: 62%;
  opacity: 0.8;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
`;

export default function OnBoardingCore({
  title,
  desc,
  children,
  onSubmit,
  submitButtonText,
  style,
  textContainerStyle,
  additionalButtons,
  desktopWidth,
  submitButtonProps = {},
  skipID,
  asEditPage,
  disableSkip,
}) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  if (asEditPage) title = null;

  let submitButton = onSubmit ? (
    <CustomPrimaryButton
      style={{
        borderRadius: "50px",
        width: "200px",
      }}
      onClick={onSubmit}
    >
      {submitButtonText}
    </CustomPrimaryButton>
  ) : null;

  let core = (
    <Container desktopWidth={desktopWidth} style={style}>
      {title ? (
        <Top style={textContainerStyle}>
          <Title>{title}</Title>
          {desc ? <Medium>{desc}</Medium> : null}
        </Top>
      ) : null}

      <Inputs>{children}</Inputs>

      {asEditPage ? (
        submitButton
      ) : (
        <Buttons>
          {!disableSkip && (
            <CustomButton
              style={{ height: "55px", width: "100px" }}
              onClick={onSkip}
              disabled={!skipID}
              variant="minimal-underlined"
            >
              Skip
            </CustomButton>
          )}

          {submitButton}
        </Buttons>
      )}
    </Container>
  );

  if (asEditPage) return <DesktopContainer>{core}</DesktopContainer>;

  return core;

  async function onSkip() {
    try {
      let newLoggedInUser = { ...loggedInUser, [skipID]: true };
      setLoggedInUser(newLoggedInUser);

      await serverLine.patch("/me", { changes: { [skipID]: true } });
    } catch (e) {
      window.popupAlert(e.message);
    }
  }
}

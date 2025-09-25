import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
import CustomPrimaryButton from "./CustomPrimaryButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  padding: 30px;
  width: 430px;
  height: auto;
  border-radius: 10px;
  background-color: var(--surface);

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
  font-weight: 900;
  justify-content: center;
  text-align: center;
  font-size: 17px;
  color: var(--element);
  text-transform: capitalize;
  margin-top: 20px;
  /* font-style: italic; */
  font-family: "Montserrat", sans-serif;
`;

const Medium = styled.div`
  /* font-weight: 900; */
  opacity: 0.4;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: var(--accent);
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
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 20px;
`;

const Underline = styled.div`
  height: 2px;
  border-radius: 5px;
  margin-top: -5px;
  width: 62%;
  opacity: 0.8;
  background: linear-gradient(90deg, transparent, var(--element), transparent);
`;

export default function InputCard({
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
}) {
  return (
    <Container desktopWidth={desktopWidth} style={style}>
      {title ? (
        <Top style={textContainerStyle}>
          <Title>{title}</Title>
          {title ? <Underline /> : null}
          {desc ? <Medium>{desc}</Medium> : null}
        </Top>
      ) : null}

      <Inputs>{children}</Inputs>
      <Buttons>
        {additionalButtons}
        {onSubmit ? (
          <CustomPrimaryButton
            style={{
              width: "160px",
              borderRadius: "50px",
            }}
            {...submitButtonProps}
            onClick={onSubmit}
          >
            {submitButtonText}
          </CustomPrimaryButton>
        ) : null}
      </Buttons>
    </Container>
  );
}

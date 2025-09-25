import styled from "styled-components";

import CustomButton from "../../helperComponents/CustomButton.js";

const Img = styled.img`
  height: 35px;
  width: 35px;
  cursor: pointer;
  object-fit: contain;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  border-radius: 10px;
  height: 178px;
  animation: centerScaleReveal 0.6s ease-in;
  width: 100%;

  color: var(--accent);

  border: 1px solid #222;
  background-color: var(--highlightBackgroundDark);
  cursor: pointer;

  transition: all 0.25s ease-in-out;

  &:hover {
    transform: scale(0.9);
  }

  @media (max-width: 900px) {
    height: 135px;
    /* flex-direction: row; */
    gap: 18px;
  }
`;

const Text = styled.div`
  font-size: 12px;
  text-align: center;
  width: 90%;
  text-transform: uppercase;
  font-weight: 900;

  /* font-size: 18px; */
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
  /* font-family: "Montserrat", sans-serif; */

  @media (max-width: 900px) {
    /* text-align: unset; */
    font-size: 10px;
  }
`;

const Icon = styled.div`
  font-size: 33px;
`;

const PlainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  align-items: center;
`;

export default function BigButton({ link, icon, iconImage, children }) {


  return (
    <CustomButton
      href={link}
      style={{ borderRadius: "10px", padding: "35px 0" }}
    >
      <PlainContainer>
        {iconImage ? <Img src={"/button-icons/" + iconImage + ".png"} /> : null}
        {icon ? <Icon>{icon}</Icon> : null}
        <Text>{children}</Text>
      </PlainContainer>
    </CustomButton>
  );
}

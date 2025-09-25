import { AiOutlineLeft } from "react-icons/ai";
import goTo from "../../../controllers/goTo";
import CustomButton from "../../helperComponents/CustomButton";
import CornerProfileButton from "./CornerProfileButton";
import styled from "styled-components";
import { FaAngleLeft, FaArrowLeft } from "react-icons/fa";
import ColorThemeSelector from "./ColorThemeSelector";
import { PiPlus } from "react-icons/pi";
import { MdMore } from "react-icons/md";
import { RiMore2Line } from "react-icons/ri";
import { useContext } from "react";
import Context from "../../../Context";
import { BsChevronLeft } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0;
  width: 100%;
  /* margin-bottom: 20px; */

  @media (max-width: 900px) {
    padding: 18px 20px;
    padding-right: 15px;
    /* border-bottom: 1px solid var(--accentSurface); */
    width: 100%;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: center;
  animation: centerScaleReveal 0.4s ease-in-out forwards;

  @media (max-width: 900px) {
    gap: 13px;
  }
`;

const Title = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const SecondaryTitle = styled.span`
  font-size: 14px;
  /* color: var(--elementDim); */
  text-transform: capitalize;
  opacity: 0.8;
  font-weight: 600;
  color: var(--accent);

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const PrimaryTitle = styled.span`
  font-size: 22px;
  color: var(--accent);
  font-weight: 600;
  text-transform: capitalize;

  @media (max-width: 900px) {
    font-size: 17px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const BackButton = styled.div`
  height: 50px;
  width: 50px;
  background-color: transparent;
  color: var(--accent);
  border: 1px solid var(--accentDim);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  font-size: 17px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: var(--surface3);
  }

  @media (max-width: 900px) {
    border: none;
    width: auto;
    font-size: 30px;
  }
`;

const RightMobile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileHomeLogo = styled.img`
  width: 130px;
  height: auto;
`;

export default function LoggedInTopBar({
  showBackButton = false,
  isHome = false,
  titleLine1,
  titleLine2,
}) {
  const { isMobile } = useContext(Context);
  let mobileTopButtonStyle = {
    height: "35px",
    width: "35px",
    background: "var(--accentSurface)",
    border: "1px solid var(--accentDim)",
  };

  let mobileTopButtonTextStyle = {
    color: "var(--accent)",
    fontSize: "20px",
  };

  let leftComp = (
    <Left onClick={showBackButton ? goTo(-1) : null}>
      {showBackButton ? (
        <BackButton>
          <BsChevronLeft />
        </BackButton>
      ) : null}

      <Title>
        {/* <SecondaryTitle>{titleLine1}</SecondaryTitle> */}
        {/* <PrimaryTitle>{titleLine2}</PrimaryTitle> */}

        {/* <SecondaryTitle>{titleLine1}</SecondaryTitle> */}
        <PrimaryTitle>{titleLine1}</PrimaryTitle>

        {titleLine2 && <SecondaryTitle>{titleLine2}</SecondaryTitle>}
      </Title>
    </Left>
  );

  if (isMobile && isHome) {
    leftComp = <MobileHomeLogo src="/logo/full-logov2.jpg" />;
  }

  return (
    <Container>
      {leftComp}

      {isHome ? (
        <RightMobile>
          <CustomButton
            style={mobileTopButtonStyle}
            iconStyle={mobileTopButtonTextStyle}
            icon={<PiPlus />}
            onClick={goTo("/select-post-type")}
          ></CustomButton>
          <CustomButton
            onClick={goTo("/options")}
            style={mobileTopButtonStyle}
            iconStyle={mobileTopButtonTextStyle}
            icon={<RiMore2Line />}
          ></CustomButton>
        </RightMobile>
      ) : null}

      <Right>
        <ColorThemeSelector />
        {/* <CornerProfileButton /> */}
      </Right>
    </Container>
  );
}

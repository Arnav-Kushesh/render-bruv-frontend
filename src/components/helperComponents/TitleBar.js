import { useContext } from "react";
import { BsBack } from "react-icons/bs";
import styled from "styled-components";
import Context from "../../Context";
import { IoIosArrowBack } from "react-icons/io";
import StylishUnderline from "./StylishUnderline";
import goTo from "../../controllers/goTo";

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 5px;
`;

const DesktopTitle = styled.div`
  font-weight: 900;
  text-align: center;
  font-size: 20px;
  color: var(--accent);
  text-transform: capitalize;

  font-family: "Montserrat", sans-serif;

  font-style: italic;
  text-transform: uppercase;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px 5vw;
  margin-bottom: 20px;
  gap: 10px;
  border-bottom: 1px solid #222;
  background-color: var(--highlightBackgroundDark);
  position: sticky;
  z-index: 900;
  box-shadow: 0 1px 3px 0 #000;
  top: 0;
`;

const BackButton = styled.div`
  display: flex;
  justify-content: center;
  opacity: 0.8;
  align-items: center;
`;

const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  opacity: 0.8;
`;

export default function TitleBar({ children, onlyMobile }) {
  const { isMobile } = useContext(Context);

  if (!isMobile) {
    if (onlyMobile) return null;
    return (
      <DesktopContainer>
        <DesktopTitle>{children}</DesktopTitle>
        <StylishUnderline />
      </DesktopContainer>
    );
  }

  return (
    <Container onClick={goTo(-1)}>
      <BackButton>
        <IoIosArrowBack />
      </BackButton>

      <Title>{children}</Title>
    </Container>
  );
}

import styled from "styled-components";
import { useContext } from "react";
import Context from "../../Context.js";
import NavBarHoz from "./NavBarHoz.js";
import ShortWidth from "../../components/helperComponents/utils/ShortWidth.js";
import BrandContainerThemed2d from "../../components/brand/BrandContainerThemed2d.js";

const TopPart = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  z-index: 100;

  margin-top: 50px;

  animation: centerScaleReveal 0.6s ease-in-out forwards;

  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
    margin: 0;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`;

export default function LoggedInHeaderHoz() {
  const { loggedInUser, isMobile } = useContext(Context);

  if (!loggedInUser) return null;

  return (
    <ShortWidth>
      <TopPart>
        <BrandContainerThemed2d />

        <Right>
          <NavBarHoz />
        </Right>
      </TopPart>
    </ShortWidth>
  );
}

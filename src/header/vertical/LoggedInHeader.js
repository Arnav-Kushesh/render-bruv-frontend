import styled from "styled-components";
import { useContext } from "react";
import Context from "../../Context.js";
import NavBar from "./NavBar.js";
import BrandContainerThemed from "../../components/brand/BrandContainerThemed.js";

const TopPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  margin-top: 25px;
  margin-left: 30px;
  height: calc(100vh - 50px);
  justify-content: space-between;
  top: 25px;
  position: sticky;
  overflow: hidden;
  z-index: 100;
  border: 1px solid var(--border);
  background: var(--headerSurface);
  /* background: transparent; */
  border-radius: 10px;
  padding-top: 25px;
  animation: centerScaleReveal 0.6s ease-in-out forwards;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 0 10px;
  padding-bottom: 15px;
`;

export default function LoggedInHeader() {
  const { loggedInUser, isMobile, notificationCount } = useContext(Context);

  if (!loggedInUser) return null;

  return (
    <TopPart>
      <BrandContainerThemed
        style={{ color: "var(--headerAccent)", paddingLeft: "25px" }}
      />

      <Right>
        <NavBar />
      </Right>
    </TopPart>
  );
}

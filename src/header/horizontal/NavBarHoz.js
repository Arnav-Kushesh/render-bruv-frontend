import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context.js";
import getNavBarOptions from "../../data/getNavBarOptions.js";
import AnimatedNavHoz from "./AnimatedNavHoz.js";
import getNavBarOptions2 from "../../data/getNavBarOptions2.js";

const TopPart = styled.div`
  display: flex;
  flex-direction: row;
  width: 90vw;
  justify-content: space-between;
  padding-top: 50px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  top: 0;
  position: sticky;
  z-index: 100;
  background-color: var(--rootBackgroundColor);

  @media (max-width: 900px) {
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  /* align-items: center; */
  padding: 30px;
  padding-bottom: 20px;
  width: 100%;
  /* padding-bottom: 35px; */

  @media (max-width: 900px) {
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 100;
    width: calc(100vw - 20px);
    gap: 0;
    justify-content: space-between;
    box-shadow: 2px -9px 20px 18px #000000;
    border-radius: 15px;
  }

  @media (max-height: 650px) {
    //When keyboard is visible, hide the header
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const TopPartMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
`;

const RowMobile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export default function NavBarHoz() {
  const { loggedInUser, notificationCount } = useContext(Context);
  const [tabIndex, setTabIndex] = useState(0);

  let options = getNavBarOptions2({ loggedInUser, notificationCount });

  if (!loggedInUser) return null;

  return (
    <AnimatedNavHoz
      tabs={options}
      activeIndex={tabIndex}
      setActiveIndex={setTabIndex}
    />
  );
}

import styled from "styled-components";
import { useContext } from "react";
import Context from "../../../Context.js";
import { GoHomeFill } from "react-icons/go";
import { FaAddressCard } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { TbShoppingCartFilled } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import goTo from "../../../controllers/goTo.js";

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
  flex-direction: row;
  gap: 40px;
  align-items: center;
  padding: 0px 35px;
  border-radius: 10px;
  height: 80px;

  background: #161716;
  /* animation: centerScaleReveal 0.4s ease-in; */
  /* background: var(--gradientSurface); */

  @media (max-width: 900px) {
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 100;
    width: calc(100vw - 20px);
    gap: 0;
    padding: 0;
    justify-content: space-between;
    /* box-shadow: 2px -9px 20px 18px #000000; */
    border-radius: 15px;

    //
    left: 0;
    bottom: 0;
    width: 100vw;
    border-radius: 0;
    background-color: transparent;
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

const Button = styled.div`
  font-size: 25px;
  width: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(0px);
  color: #ffffff;
  opacity: 0.5;
  transition: all 0.25s ease-in-out;
  transform: translateY(-5px);

  ${({ isActive }) => {
    if (isActive) {
      return `transform: translateY( calc(-1 * (100vw / 5) * 0.13 ) );
      color: #000;
      opacity:1;
      `;
    }
  }}
`;

const Main = styled.div`
  position: relative;
`;

const LeftPart = styled.div`
  background-color: red;
  background-color: var(--navBarBg);
  left: 0;
  bottom: 0;
  position: absolute;
  z-index: 99;
  height: 80px;
  width: 170px;
  border-radius: 0 20px 0 0;
  z-index: -1;
  pointer-events: none;
  transition: all 0.25s ease-in-out;
`;

const RightPart = styled.div`
  background-color: red;
  background-color: var(--navBarBg);
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: 99;
  height: 80px;
  width: 170px;
  border-radius: 20px 0 0 0;
  z-index: -1;
  pointer-events: none;
  transition: all 0.25s ease-in-out;
`;

const Circle = styled.div`
  position: absolute;
  left: 0;
  bottom: 18px;
  z-index: -1;
  width: 100%;
  background-color: var(--accent);
  height: 63px;
  width: 63px;
  left: 180px;
  border-radius: 50%;
  transition: all 0.25s ease-in-out;
`;

const CircleForInvertedCurve = styled.div`
  position: absolute;
  left: 0;
  bottom: -10px;
  z-index: -1;
  width: 100%;
  background-color: transparent;
  height: 100px;
  width: 74px;
  left: 170px;
  border-radius: 100%;

  border-bottom: 18px solid var(--navBarBg);
  outline: none;
  box-shadow: 0 30px 0 10px var(--navBarBg);
  transition: all 0.25s ease-in-out;
`;

const Shadow = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0);
  height: 100%;
  width: 100%;
  z-index: -1;
  filter: blur(7px);
`;

const exemptedRoutes = [
  "/employee",
  "/activity-type",
  "/booking-and-report",
  "/store-item",
  "/my-activities",
  "/announcement",
];

export default function NavBarWithInvertedCurve() {
  const { loggedInUser, currentRoute } = useContext(Context);

  if (!loggedInUser) return null;

  let currentPageType = window.location.pathname;
  currentPageType = currentPageType.split("/")[1];
  if (!currentPageType) currentPageType = "home";

  let config = getConfig();

  for (let item of exemptedRoutes) {
    if (currentRoute.indexOf(item) !== -1) return null;
  }

  return (
    <Links>
      <Button onClick={goTo("/")} isActive={currentPageType == "home"}>
        <GoHomeFill />
      </Button>

      <Button
        onClick={goTo("/membership")}
        isActive={currentPageType == "membership"}
      >
        <FaAddressCard />
      </Button>

      <Button
        onClick={goTo("/shopping")}
        isActive={currentPageType == "shopping"}
      >
        <RiShoppingBag2Fill />
      </Button>

      <Button onClick={goTo("/cart")} isActive={currentPageType == "cart"}>
        <TbShoppingCartFilled />
      </Button>

      <Button
        onClick={goTo("/settings")}
        isActive={currentPageType == "settings"}
      >
        <IoSettingsSharp />
      </Button>

      <Shadow />
      <LeftPart style={config.leftPart}></LeftPart>

      <RightPart style={config.rightPart}></RightPart>

      <Circle style={config.circle} />

      <CircleForInvertedCurve style={config.invertedCircle} />
    </Links>
  );

  function getConfig() {
    let items = ["home", "membership", "shopping", "cart", "settings"];

    let index = items.indexOf(currentPageType);
    let totalItems = items.length;
    let itemWidth = window.innerWidth / totalItems;

    return {
      leftPart: {
        left: 0,
        width: itemWidth * index + "px",
      },
      rightPart: {
        right: 0,
        width: itemWidth * (totalItems - (index + 1)) + "px",
      },
      invertedCircle: {
        width: itemWidth,
        left: itemWidth * index + "px",
      },
      circle: {
        width: itemWidth * 0.8 + "px",
        height: itemWidth * 0.8 + "px",
        left: itemWidth * index + itemWidth * 0.1 + "px",
      },
    };
  }

  function getTotalCartItems() {
    if (!loggedInUser.cart) return 0;

    let totalItems = 0;

    for (let itemId in loggedInUser.cart) {
      let item = loggedInUser.cart[itemId];
      totalItems += item.quantity;
    }

    return totalItems;
  }
}

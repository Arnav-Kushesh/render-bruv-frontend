import styled from "styled-components";
import { useContext } from "react";
import Context from "../../../Context.js";
import AnimatedPillTabsForTheme from "../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabsForTheme.js";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import AnimatedNavVertical from "../../../header/vertical/AnimatedNavVertical.js";
import AnimatedPillTabsVertical from "../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabsVertical.js";
import AnimatedPillTabs from "../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs.js";
const Container = styled.div`
  /* width: 100px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* height: 55px; */
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

export default function ColorThemeSelector({
  surfaceColor,
  elementColor,
  accentAltColor,
  accentColor,
}) {
  const { colorMode, updateColorMode, loggedInUser } = useContext(Context);

  if (!loggedInUser) return null;

  let options = [
    { label: "Glass", value: "LIGHT_GLASS" },
    { label: "Obsidian", value: "DARK_GLASS" },
    { label: "Black", value: "DARK_SIMPLE" },
    { label: "Simple", value: "LIGHT_SIMPLE" },

    // { label: "Blue", value: "DARK_BLUE" },
    // { label: "Green", value: "GREEN" },
  ];

  return (
    <Container>
      {/* <AnimatedPillTabsVertical
        containerStyle={{ width: "200px" }}
        tabs={options}
        value={colorMode}
        onChange={updateColorMode}
      /> */}

      <AnimatedPillTabs
        tabStyle={{ fontSize: "14px" }}
        tabs={options}
        value={colorMode}
        onChange={updateColorMode}
      />

      {/* <AnimatedPillTabsForTheme
        surfaceColor={surfaceColor}
        elementColor={elementColor}
        accentColor={accentColor}
        accentAltColor={accentAltColor}
        tabs={options}
        activeIndex={findIndex()}
        setActiveIndex={(newIndex) => {
          updateColorMode(options[newIndex].value);
        }}
      /> */}
    </Container>
  );

  function findIndex() {
    let i = 0;

    for (let item of options) {
      if (item.value == colorMode) return i;
      i++;
    }

    return i;
  }
}

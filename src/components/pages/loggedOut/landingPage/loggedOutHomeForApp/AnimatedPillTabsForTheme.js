import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 30px;
  padding: 0;
  /* width: 100px; */
  height: 40px;
  flex-direction: row;
  gap: 0;
  /* width: 100%; */
  /* height: 100%; */
  /* width: fit-content; */
`;

const Tab = styled.div`
  padding: 0 20px;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 700;
  border-radius: 999px;
  height: 38px;
  /* width: 150px; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0; */

  cursor: pointer;
  z-index: 1;
  /* flex: 1; */
  /* color: ${({ $active }) =>
    $active ? "var(--accentAlt)" : "var(--elementDim)"}; */

  color: ${({ $active }) =>
    $active ? "var(--accentAlt)" : "var(--elementDim)"};
  transition: color 0.2s ease;
`;

const Pill = styled.div`
  position: absolute;
  top: 0px;
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  /* width: 50px; */
  height: calc(100%);
  /* background: var(--accent); */
  background: var(--element);
  border-radius: 30px;
  transition: all 0.3s ease;
  z-index: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  filter: brightness(1);
`;

const AnimatedPillTabsForTheme = ({
  tabs = [],
  activeIndex,
  setActiveIndex,
  accentAltColor = "var(--accentAlt)",
  surfaceColor = "var(--surface)",
  elementColor = "var(--element)",
  accentColor = "var(--accent)",
}) => {
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    if (currentTab) {
      setPillStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeIndex, tabs]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <TabContainer>
      <Pill
        style={{ background: "var(--element)" }}
        left={pillStyle.left}
        width={pillStyle.width}
      />
      {tabs.map((item, index) => (
        <Tab
          style={{
            color: index === activeIndex ? accentAltColor : elementColor,
          }}
          key={index}
          $active={index === activeIndex}
          onClick={() => handleTabClick(index)}
          ref={(el) => (tabRefs.current[index] = el)}
        >
          {item.label}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default AnimatedPillTabsForTheme;

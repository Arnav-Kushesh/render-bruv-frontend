import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px;
  width: fit-content;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 650;
  border-radius: 999px;
  cursor: pointer;
  z-index: 1;
  color: ${({ $active }) =>
    $active ? "var(--activeElement2)" : "var(--element)"};
  transition: color 0.2s ease;

  @media (max-width: 900px) {
    font-size: 11px;
    font-weight: 700;
    padding: 15px 14px;
    flex: 1;
  }
`;

const Pill = styled.div`
  position: absolute;
  top: 4px;
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  height: calc(100% - 8px);
  /* background-color: var(--accent); */
  background-color: var(--activeSurface2);
  border-radius: 100px;
  transition: all 0.3s ease;
  z-index: 0;
  box-shadow: var(--shadow2);
`;

const AnimatedPillTabs = ({
  tabs = [],
  value,
  onChange,
  containerStyle,
  pillStyle,
  tabStyle,
}) => {
  const [pillData, setPillData] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  let activeIndex = null;

  let i = 0;
  for (let item of tabs) {
    if (item.value == value) activeIndex = i;

    i++;
  }

  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    if (currentTab) {
      setPillData({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeIndex, tabs]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <TabContainer style={containerStyle}>
      <Pill left={pillData.left} width={pillData.width} style={pillStyle} />
      {tabs.map((item, index) => (
        <Tab
          style={tabStyle}
          key={item.label}
          $active={index === activeIndex}
          onClick={() => handleTabClick(index)}
          ref={(el) => (tabRefs.current[index] = el)}
        >
          {item.label}
        </Tab>
      ))}
    </TabContainer>
  );

  function setActiveIndex(newIndex) {
    onChange(tabs[newIndex].value);
  }
};

export default AnimatedPillTabs;

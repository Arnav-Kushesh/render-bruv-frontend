import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 15px;
  padding: 4px;
  height: fit-content;
  width: fit-content;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 650;
  border-radius: 12px;
  cursor: pointer;
  z-index: 1;
  text-align: left;
  color: ${({ $active }) => ($active ? "var(--elementAlt)" : "var(--element)")};
  transition: color 0.2s ease;

  @media (max-width: 900px) {
    font-size: 13px;
    font-weight: 700;
    padding: 12px 16px;
  }
`;

const Pill = styled.div`
  position: absolute;
  left: 4px;
  top: ${({ top }) => `${top}px`};
  height: ${({ height }) => `${height}px`};
  width: calc(100% - 8px);
  background-color: var(--element);
  border-radius: 15px;
  transition: all 0.3s ease;
  z-index: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AnimatedPillTabsVertical = ({
  tabs = [],
  value,
  onChange,
  containerStyle,
  pillStyle,
}) => {
  const [pillData, setPillData] = useState({ top: 0, height: 0 });
  const tabRefs = useRef([]);

  let activeIndex = tabs.findIndex((item) => item.value === value);

  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    if (currentTab) {
      setPillData({
        top: currentTab.offsetTop,
        height: currentTab.offsetHeight,
      });
    }
  }, [activeIndex, tabs]);

  const handleTabClick = (index) => {
    onChange(tabs[index].value);
  };

  return (
    <TabContainer style={containerStyle}>
      <Pill top={pillData.top} height={pillData.height} style={pillStyle} />
      {tabs.map((item, index) => (
        <Tab
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
};

export default AnimatedPillTabsVertical;

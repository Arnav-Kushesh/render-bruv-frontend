import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  position: relative;
  background-color: #222;
  border-radius: 999px;
  padding: 4px;
  width: fit-content;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 700;
  border-radius: 999px;
  cursor: pointer;
  z-index: 1;
  color: ${({ $active }) => ($active ? "#000" : "#666")};
  transition: color 0.2s ease;
`;

const Pill = styled.div`
  position: absolute;
  top: 4px;
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  height: calc(100% - 8px);
  background-color: var(--accent);
  border-radius: 999px;
  transition: all 0.3s ease;
  z-index: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LoggedOutPillTabs = ({
  tabs = [],
  onChange,
  activeIndex,
  setActiveIndex,
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
    if (onChange) onChange(index);
  };

  return (
    <TabContainer>
      <Pill left={pillStyle.left} width={pillStyle.width} />
      {tabs.map((label, index) => (
        <Tab
          key={label}
          $active={index === activeIndex}
          onClick={() => handleTabClick(index)}
          ref={(el) => (tabRefs.current[index] = el)}
        >
          {label}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default LoggedOutPillTabs;

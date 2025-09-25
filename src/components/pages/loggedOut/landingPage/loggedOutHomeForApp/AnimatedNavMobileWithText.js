import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import goTo from "../../../../../controllers/goTo";

const TabContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 100;
  width: 100vw;
  gap: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 0;
  justify-content: space-between;
  border-radius: 15px;
  height: 50px;
  left: 0;
  bottom: 0;
  width: 100vw;
  border-radius: 0;
  border-top: 2px solid var(--accentDim);
  background-color: var(--accentSurface);
  backdrop-filter: blur(30px);
`;

const TabList = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TabOld = styled.button`
  padding: 10px 20px;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 700;
  border-radius: 999px;
  cursor: pointer;
  z-index: 1;
  color: ${({ active }) => (active ? "var(--elementAlt)" : "var(--element)")};
  transition: color 0.2s ease;
`;

const Tab = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 25px;
  display: flex;
  gap: 9px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  opacity: 0.8;
  /* background-color: red; */

  filter: saturate(0.5);
  animation: all 0.6s ease-in;
  color: var(--accent);
  width: 33vw;
  padding: 0 0;
  height: 100%;
  /* background-color: red; */

  ${({ $active }) => {
    if ($active) {
      return `
      opacity:1;
      filter: saturate(1);
      color: var(--elementAlt);
      `;
    }
  }}
`;

const Icon = styled.div`
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 10px; */
  filter: brightness(1) drop-shadow(0px 0px 0px black);
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translateX(30px);

  ${({ $active }) => {
    if ($active) {
      return `
      filter: brightness(0) drop-shadow(0px 0px 0.3px black);
      transform: translateX(0px);
      `;
    }
  }}
`;

const Text = styled.div`
  font-size: 15px;
  font-weight: 700;
  transition: all 0.3s ease;
  transform: scale(0);

  ${({ $active }) => {
    if ($active) {
      return `
        transform: scale(1);
      `;
    }
  }}
`;

const Pill = styled.div`
  position: absolute;
  top: 0;

  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  height: 100%;

  background-color: var(--accent);
  border-radius: 10px;
  transition: all 0.3s ease;
  z-index: 0;
  /* filter: blur(20px); */
  transform: scale(0.9);
`;

const AnimatedNavMobileWithText = ({
  tabs = [],

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
    goTo(tabs[index].link)();
  };

  return (
    <TabContainer>
      <Pill left={pillStyle.left} width={pillStyle.width} />
      <TabList>
        {tabs.map((item, index) => (
          <Tab
            key={item.label}
            $active={index === activeIndex}
            onClick={() => handleTabClick(index)}
            ref={(el) => (tabRefs.current[index] = el)}
          >
            <Icon $active={index === activeIndex}>{item.icon}</Icon>
            <Text $active={index === activeIndex}>{item.label}</Text>
          </Tab>
        ))}
      </TabList>
    </TabContainer>
  );
};

export default AnimatedNavMobileWithText;

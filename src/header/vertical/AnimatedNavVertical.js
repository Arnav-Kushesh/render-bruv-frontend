import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import goTo from "../../controllers/goTo";

const TabContainer = styled.div`
  display: flex;
  position: relative;

  width: 100%;
  /* width: fit-content; */
  flex-direction: column;
  /* height: 388px; */
`;

const Tabs = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  z-index: 10;
  width: 100%;
  /* width: fit-content; */
  flex-direction: column;
  gap: 0px;
`;

const Tab = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 25px;
  display: flex;
  gap: 19px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  animation: all 0.6s ease-in;
  color: var(--headerElementDim);
  padding: 20px 0;
  padding-left: 25px;

  ${({ $active }) => {
    if ($active) {
      return `
       color: var(--accent);
      `;
    }
  }}

  &:hover {
    color: var(--accent);

    ${({ $active }) => {
      if ($active) {
        return `
       color: var(--accent);
      `;
      }
    }}
  }
`;

const Icon = styled.div`
  /* height: 25px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  /* margin-right: 10px; */
`;

const Text = styled.div`
  font-size: 15.5px;
  font-weight: 600;
`;

const Pill = styled.div`
  position: absolute;
  right: -10px;
  top: ${({ top }) => `${top + 16}px`};
  height: ${({ height }) => `${height - 36}px`};
  width: 10%;
  background-color: var(--accent);
  border-radius: 50px 0 0 50px;

  transition: all 0.3s ease;
  z-index: 5;
  /* filter: blur(20px); */
  /* transform: scale(0.7); */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Badge = styled.div`
  border-radius: 100px;
  right: 35px;
  top: 5px;
  position: absolute;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 9px;
  background-color: var(--headerAccent);
  color: var(--headerAccentAlt);
`;

const AnimatedNavVertical = ({ tabs = [], activeIndex, setActiveIndex }) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    let currentPath = window.location.pathname;

    if (currentPath !== "/") {
      setShouldShow(true);
    } else {
      let shouldShowVal = false;
      let i = 0;
      for (let item of tabs) {
        if (item.link == currentPath) {
          shouldShowVal = true;
          setActiveIndex(i);
        }
        i++;
      }
      setShouldShow(shouldShowVal);
    }
  }, []);

  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    if (currentTab) {
      setPillStyle({
        top: currentTab.offsetTop,
        height: currentTab.offsetHeight,
      });
    }
  }, [activeIndex, tabs]);

  const handleTabClick = (index) => {
    setShouldShow(true);
    setActiveIndex(index);
    goTo(tabs[index].link)();
  };

  return (
    <TabContainer style={{ height: tabs.length * 64.6 + "px" }}>
      <Tabs>
        {tabs.map((item, index) => (
          <Tab
            key={item.label}
            $active={index === activeIndex}
            onClick={() => handleTabClick(index)}
            ref={(el) => (tabRefs.current[index] = el)}
          >
            {item.badge ? <Badge>{item.badge}</Badge> : null}
            {/* Badge is for notifications */}
            <Icon>{item.icon}</Icon>
            <Text>{item.label}</Text>
          </Tab>
        ))}
      </Tabs>

      {shouldShow ? (
        <Pill top={pillStyle.top} height={pillStyle.height} />
      ) : null}
    </TabContainer>
  );
};

export default AnimatedNavVertical;

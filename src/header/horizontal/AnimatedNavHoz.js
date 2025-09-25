import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import goTo from "../../controllers/goTo";
import Context from "../../Context";

const TabContainer = styled.div`
  display: flex;
  position: relative;

  /* width: 100%; */
  /* width: fit-content; */
  flex-direction: row;
  /* height: 388px; */
  width: 735px;
  width: 640px;
  height: 51px;

  border: 1px solid var(--borderIntense);
  background: var(--headerSurface);
  overflow: hidden;
  border-radius: 15px;

  @media (max-width: 900px) {
    width: 350px;
    height: 51px;
  }
`;

const Tabs = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  /* width: 100%; */
  /* width: fit-content; */
  flex-direction: row;
  /* gap: 20px; */
  z-index: 10;
  gap: 0;
  justify-content: flex-start;
`;

const Tab = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 25px;
  display: flex;
  gap: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* width: 100%; */

  animation: all 0.6s ease-in;
  color: var(--headerElementDim);
  padding: 15px 25px;
  transform: scale(1);
  transition: 0.15s ease-in-out;

  ${({ $active }) => {
    if ($active) {
      return `
       color: var(--elementAlt);
      `;
    }
  }}

  &:hover {
    /* background: var(--surface); */
    color: var(--element);
    transform: scale(0.94);

    ${({ $active }) => {
      if ($active) {
        return `
         color: var(--accentAlt);
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
  font-size: 20px;
  /* margin-right: 10px; */
`;

const Text = styled.div`
  font-size: 15.5px;
  font-weight: 600;
  white-space: nowrap;
`;

const Pill = styled.div`
  position: absolute;
  /* right: -10px; */
  left: ${({ left }) => `${left}px`};
  /* top: ${({ top }) => `${top + 16}px`}; */
  /* height: ${({ height }) => `${height - 36}px`}; */
  width: ${({ width }) => `${width}px`};
  height: 100%;
  /* width: 10%; */
  /* background-color: var(--accent); */
  background-color: var(--element);
  /* border-radius: 15px; */

  transition: all 0.3s ease;
  z-index: 2;
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

const AnimatedNavHoz = ({ tabs = [], activeIndex, setActiveIndex }) => {
  const { currentRoute } = useContext(Context);
  const [shouldShow, setShouldShow] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    console.log("currentRoute", currentRoute);
    let currentPath = window.location.pathname;
    let pathNameAndSearch = currentPath + window.location.search;

    console.log("pathname", currentPath, pathNameAndSearch);

    if (currentPath === "/") {
      setShouldShow(true);
    } else {
      let shouldShowVal = false;
      let i = 0;
      for (let item of tabs) {
        if (item.link == currentPath || item.link == pathNameAndSearch) {
          shouldShowVal = true;
          setActiveIndex(i);
        }
        i++;
      }

      console.log("currentPath", currentPath, currentRoute, shouldShowVal);

      setShouldShow(shouldShowVal);
    }
  }, [currentRoute]);

  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    if (currentTab) {
      setPillStyle({
        top: currentTab.offsetTop,
        left: currentTab.offsetLeft,
        height: currentTab.offsetHeight,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeIndex, tabs]);

  const handleTabClick = (index) => {
    setShouldShow(true);
    setActiveIndex(index);
    goTo(tabs[index].link)();
  };

  return (
    <TabContainer>
      <Tabs>
        {tabs.map((item, index) => (
          <Tab
            style={item.style}
            key={item.label}
            $active={index === activeIndex && shouldShow}
            onClick={() => handleTabClick(index)}
            ref={(el) => (tabRefs.current[index] = el)}
          >
            {item.badge ? <Badge>{item.badge}</Badge> : null}
            {/* Badge is for notifications */}

            {item.icon && <Icon>{item.icon}</Icon>}
            {item.label && <Text>{item.label}</Text>}
          </Tab>
        ))}
      </Tabs>

      {shouldShow ? (
        <Pill
          top={pillStyle.top}
          left={pillStyle.left}
          height={pillStyle.height}
          width={pillStyle.width}
        />
      ) : null}
    </TabContainer>
  );
};

export default AnimatedNavHoz;

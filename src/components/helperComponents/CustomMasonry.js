import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import Context from "../../Context";

const MultiColumn = styled.div`
  display: flex;
  width: 100%;
  /* justify-content: space-between; */

  @media (max-width: 900px) {
    width: 100%;
  }
  /* display: grid; */
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Item = styled.div``;

export default function CustomMasonry({
  list,
  maxCol,
  minCol,
  gap = "25px",
  mobileGap = "10px",
  colsOnMobile = 1,
  type,
}) {
  const { isMobile } = useContext(Context);

  let numberOfSplits = maxCol;

  if (list.length < numberOfSplits) {
    numberOfSplits = list.length;
  }

  if (minCol) {
    if (minCol > numberOfSplits) {
      numberOfSplits = minCol;
    }
  }

  if (isMobile && colsOnMobile) numberOfSplits = colsOnMobile;

  // console.log("numberOfSplits", numberOfSplits);

  let split = doSplit(numberOfSplits);
  let toRender = [];

  if (isMobile) {
    gap = mobileGap;
  }

  let i = 0;
  for (let item of split) {
    let subList = [];

    let j = 0;
    for (let subItem of item) {
      subList.push(<Item key={j}>{subItem}</Item>);
      j++;
    }
    toRender.push(
      <Col style={{ gap }} key={i}>
        {subList}
      </Col>
    );
    i++;
  }

  return <MultiColumn style={{ gap }}>{toRender}</MultiColumn>;

  function doSplit(numberOfSplits) {
    let splits = [];

    for (let j = 0; j < numberOfSplits; j++) {
      splits[j] = [];
    }

    let i = 0;
    for (let item of list) {
      let remainder = i % numberOfSplits;
      if (!splits[remainder]) splits[remainder] = [];
      splits[remainder].push(item);
      i++;
    }

    return splits;
  }
}

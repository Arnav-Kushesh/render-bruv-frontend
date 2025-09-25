import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CustomButton from "../helperComponents/CustomButton";

const Options = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  /* width: 400px; */
  gap: 15px;
  align-items: center;
  padding: 50px;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Option = styled.button`
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

const PopupOptions = ({ options = [] }) => {
  return (
    <Container>
      <Options>
        {options.map((item) => (
          <CustomButton
            style={{ width: "200px" }}
            key={item.label}
            onClick={item.onClick}
          >
            {item.label}
          </CustomButton>
        ))}
      </Options>
    </Container>
  );
};

export default PopupOptions;

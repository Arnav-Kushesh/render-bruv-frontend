import React from "react";
import styled, { keyframes } from "styled-components";

// Border draw animation from one corner around the box
const borderDraw = keyframes`
  0% {
    stroke-dasharray: 0 500;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 500 0;
    stroke-dashoffset: 0;
  }
`;

// Border erase animation to hide when focus is lost
const borderErase = keyframes`
  0% {
    stroke-dasharray: 500 0;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 0 500;
    stroke-dashoffset: 0;
  }
`;

const FieldShell = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  padding: 0;
  border: 0px solid transparent;
  transition:
    box-shadow 280ms cubic-bezier(0.2, 0.9, 0.2, 1),
    transform 240ms ease;
  overflow: visible;
  border-radius: 20px;
  background: var(--activeSurface);

  &:focus-within {
    box-shadow: var(--shadow);
    background: var(--activeSurface);
    /* transform: translateY(-1px); */
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-radius: 20px;
  }

  rect {
    width: 100%;
    height: 100%;
    rx: 20;
    ry: 20;
    fill: none;
    /* stroke: var(--accent); */
    stroke: var(--border);
    stroke-width: 3;
    stroke-dasharray: 0 400;
    stroke-dashoffset: 0;
  }

  &:focus-within rect {
    animation: ${borderDraw} 0.4s ease-in-out forwards;
  }

  &:not(:focus-within) rect {
    animation: ${borderErase} 0.5s ease forwards;
  }
`;

const IconSlot = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  opacity: 0.9;
`;

const TextInput = styled.input`
  appearance: none;
  background-color: transparent;
  color: var(--element);
  font-weight: 700;
  font-size: 15px;
  border: none;
  outline: none;
  padding: 17px 15px;
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 20px;

  &::placeholder {
    color: var(--elementDim);
  }
`;

const Helper = styled.span`
  color: rgba(255, 255, 255, 0.55);
  font-size: 12px;
  margin-top: 6px;
`;

export default function CustomAnimatedInput({
  label,
  placeholder = "",
  value,
  onChange,
  icon,
  size = "md",
  width,
  fullWidth = false,
  helper,
  style,
  onTextChange,
  ...rest
}) {
  return (
    <FieldShell style={style}>
      <TextInput
        aria-label={label || placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e);
          if (onTextChange) onTextChange(e.target.value);
        }}
        size={size}
        {...rest}
      />
      <svg>
        <rect />
      </svg>
    </FieldShell>
  );
}

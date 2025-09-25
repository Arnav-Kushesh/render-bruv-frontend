import styled from "styled-components";
import { MoonLoader } from "react-spinners";
import goTo from "../../controllers/goTo.js";
import { Button } from "@mui/material";
import { useContext } from "react";
import Context from "../../Context.js";

const ScaleOnHover = styled.div`
  transition: 0.15s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const Text = styled.div`
  /* text-transform: lowercase; */
  font-weight: 700;
  display: flex;

  font-family: "Montserrat", sans-serif;

  justify-content: center;
  align-items: center;
  /* width: 100%; */
  font-size: 12px;

  @media (max-width: 900px) {
    font-size: 11px;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CustomButton({
  children,
  icon,
  onClick,
  href,
  style,
  variant,
  isLoading,
  isActive,
  onActiveStyle,
  disabled,
  onlyDesktop,
  customVariant,
  textStyle,
  iconStyle,
  surfaceColor = "var(--surface)",
  elementColor = "var(--element)",
}) {
  const { isMobile } = useContext(Context);

  if (onlyDesktop) {
    if (isMobile) return null;
  }
  if (href && !onClick) {
    onClick = () => {
      goTo(href)();
    };
  }

  if (!variant && !customVariant) {
    customVariant = "SLIGHTLY_CONTAINED";
  }

  if (!style) style = {};

  if (disabled) {
    style = { ...style, opacity: 0.5, pointerEvents: "none" };
  }

  if (isActive && onActiveStyle) {
    style = { ...style, ...onActiveStyle };
  }

  let additionalStyle = {};

  if (customVariant) {
    if (customVariant == "SLIGHTLY_CONTAINED") {
      additionalStyle = {
        ...additionalStyle,
        background: surfaceColor,
        border: `1px solid var(--borderDim)`,
      };
    } else if (customVariant == "SMALL_AND_MINIMAL") {
      textStyle = { ...textStyle, textDecoration: "underline" };

      additionalStyle = {
        ...additionalStyle,
        background: "transparent",
        border: `none`,
        padding: "5px 10px",
      };
    }
  }

  if (isLoading) icon = <MoonLoader size="20px" color="var(--element)" />;

  if (icon)
    icon = <Icon style={{ color: elementColor, ...iconStyle }}>{icon}</Icon>;

  if (!children) {
    if (icon) {
      children = icon;
      icon = null;
      additionalStyle = { height: "45px", width: "45px", padding: 0 };
    }
  } else {
    children = (
      <Text style={{ color: elementColor, ...textStyle }}>{children}</Text>
    );
  }

  return (
    <ScaleOnHover>
      <Button
        onClick={theClick}
        style={{
          minWidth: "unset",
          padding: "10px 20px",
          gap: "10px",
          borderRadius: "50px",
          border: "1px solid var(--border)",
          boxShadow: "rgb(120 166 0 / 72%) 1px 5ppx 50px 1px",
          ...additionalStyle,
          ...style,
        }}
        variant={variant}
        startIcon={icon}
      >
        {children}
      </Button>
    </ScaleOnHover>
  );

  function theClick(e) {
    e.preventDefault();
    if (onClick) onClick(e);
  }
}

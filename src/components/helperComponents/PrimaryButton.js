import { GoArrowRight } from "react-icons/go";
import CustomButton from "./CustomButton";
import { Button } from "@mui/material";
import styled from "styled-components";
import capitalizeFirstLetter from "../../controllers/capitalizeFirstLetter";
import goTo from "../../controllers/goTo";
import { styled as mStyled } from "@mui/material/styles";

const ScaleOnHover = styled.div`
  transition: 0.25s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Text = styled.div`
  /* text-transform: lowercase; */
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-style: italic; */
  font-family: "Montserrat", sans-serif;
  font-weight: 800;

  display: flex;

  justify-content: center;
  align-items: center;
  font-size: 13px;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PrimaryButton({
  onClick,
  children,
  style = {},
  textStyle,
  icon = <GoArrowRight />,
  iconStyle,
  href,
  surfaceColor = "var(--accentGradient)",
  elementColor = "var(--accentAlt)",
}) {
  if (!textStyle) textStyle = {};

  if (icon)
    icon = <Icon style={{ color: elementColor, ...iconStyle }}>{icon}</Icon>;

  if (href && !onClick) {
    onClick = () => {
      goTo(href)();
    };
  }

  return (
    <ScaleOnHover>
      <Button
        onClick={onClick}
        style={{
          minWidth: "180px",
          padding: "15px 0",
          gap: "20px",
          borderRadius: "50px",
          flexDirection: "row-reverse",
          // background: surfaceColor,
          color: elementColor,
          // border: "1px solid var(--accentDim)",
          // boxShadow: "rgb(248 75 0 / 76%) 0px 2px 20px 1px",

          background: "rgb(17 115 226 / 66%) -1px 4px 20px 0px",
          boxShadow: "2px 6px 20px 3px #4ba0ff",

          ...style,
        }}
        // sx={{
        //   // backgroundColor: "#3f51b5",
        //   ":hover": {
        //     // backgroundColor: "#303f9f",
        //     transform: "scale(1.5)", // optional animation
        //   },
        // }}
        variant="contained"
        startIcon={icon}
      >
        {children ? (
          <Text style={{ color: elementColor, ...textStyle }}>
            {capitalizeFirstLetter(children)}
          </Text>
        ) : null}
      </Button>
    </ScaleOnHover>
  );
}

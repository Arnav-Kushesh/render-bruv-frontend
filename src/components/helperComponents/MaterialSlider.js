import {
  createMuiTheme,
  createTheme,
  Slider,
  ThemeProvider,
  Typography,
} from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 10px;
  background: var(--gradientSurface);
  border: 1px solid var(--glassBorder);
  box-shadow: var(--lightShadow);
`;

const Label = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 0px;
`;

export default function MaterialSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
}) {
  return (
    <Container>
      <Label gutterBottom> {label} </Label>
      <Slider
        label={label}
        step={step}
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Container>
  );
}

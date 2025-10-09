import Rive, { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import styled from "styled-components";

const Container = styled.div`
  height: 300px;
  width: 300px;
`;
export default function Rive3dCube() {
  const { RiveComponent } = useRive({
    src: "/rive/3d_cube.riv",
    // artboard: "Truck",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Fill,
      //   alignment: Alignment.TopCenter,
      //   minX: 500,
      //   minY: 500,
    }),
  });

  return (
    <Container>
      <RiveComponent />
    </Container>
  );
}

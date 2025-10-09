import Rive, { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import styled from "styled-components";

const Container = styled.div`
  height: 300px;
  width: 300px;
`;
export default function RiveLoadingAnimation() {
  const { RiveComponent } = useRive({
    src: "https://cdn.rive.app/animations/vehicles.riv",
    artboard: "Truck",
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

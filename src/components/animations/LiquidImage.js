import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import LiquidImageCore from "./LiquidImageCore";

export default function LiquidImage({
  imageUrl,
  displacementUrl,
  width = "100%",
  height = "800px",
}) {
  return (
    <div style={{ width: width, height: height, marginBottom: "20px" }}>
      <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 1 }}>
        <Suspense fallback={null}>
          <LiquidImageCore
            imageUrl={imageUrl}
            displacementUrl={displacementUrl}
            intensity={0.3} // optional
          />
        </Suspense>
      </Canvas>{" "}
    </div>
  );
}

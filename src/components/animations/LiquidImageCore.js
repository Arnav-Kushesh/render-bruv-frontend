import React, { useRef } from "react";
import { useFrame, useLoader, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

const LiquidShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uDisp: null,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uTime: 0,
    uIntensity: 0.2,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  `
    uniform sampler2D uTexture;
    uniform sampler2D uDisp;
    uniform vec2 uMouse;
    uniform float uTime;
    uniform float uIntensity;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec2 disp = texture2D(uDisp, uv + vec2(uTime*0.05)).rg;
      vec2 offset = (disp - 0.5) * uIntensity;
      float dist = distance(uv, uMouse);
      offset *= smoothstep(0.3, 0.0, dist);
      vec4 color = texture2D(uTexture, uv + offset);
      gl_FragColor = color;
    }
  `
);

extend({ LiquidShaderMaterial });

const LiquidImageCore = ({ imageUrl, displacementUrl, intensity = 0.2 }) => {
  const materialRef = useRef();
  const { viewport } = useThree(); // viewport size
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const disp = useLoader(THREE.TextureLoader, displacementUrl);

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uMouse = new THREE.Vector2(
        mouse.x * 0.5 + 0.5,
        mouse.y * 0.5 + 0.5
      );
    }
  });

  // Scale plane to fill viewport
  const width = viewport.width;
  const height = viewport.height;
  const aspect = texture.image ? texture.image.width / texture.image.height : 1;

  return (
    <mesh scale={[width, width / aspect, 1]}>
      <planeGeometry args={[1, 1]} />
      <liquidShaderMaterial
        ref={materialRef}
        uTexture={texture}
        uDisp={disp}
        uIntensity={intensity}
      />
    </mesh>
  );
};

export default LiquidImageCore;

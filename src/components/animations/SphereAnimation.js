import styled from "styled-components";

const Video = styled.video`
  width: 200px;
  height: auto;
`;

export default function SphereAnimation() {
  return (
    <Video
      src={"/animations/sphere-animation.webm"}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}

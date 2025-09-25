import { useEffect, useState } from "react";
import { styled } from "styled-components";

const SelectedImage = styled.img`
  object-fit: cover;
  border-radius: 500px;
`;

export default function ShowSelectedImage({
  fileObject,
  height,
  width,

  borderRadius = "500px",
}) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    var fr = new FileReader();
    fr.onload = function (e) {
      setSrc(this.result);
    };
    fr.readAsDataURL(fileObject);
  }, [fileObject]);

  if (!fileObject) return;
  if (!src) return null;

  if (!height) height = "120px";
  if (!width) width = "120px";

  return <SelectedImage style={{ height, width, borderRadius }} src={src} />;
}

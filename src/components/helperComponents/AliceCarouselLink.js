import React from "react";
import goTo from "../../controllers/goTo";

export default function AliceCarouselLink(props) {
  const coords = {
    xDown: null,
    xUp: null,
  };

  const handleOnMouseDown = (e) => {
    e.preventDefault();
    coords.xUp = null;
    coords.xDown = e.clientX;
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    coords.xUp = e.clientX;
  };

  const handleOnClick = (e) => {
    if (coords.xDown !== coords.xUp) {
      e.preventDefault();
    } else {
      if (props.onClick) {
        props.onClick();
      }

      if (props.href) {
        goTo(props.href)();
      }
    }
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handleOnClick}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleMouseUp}
    >
      {props.children}
    </div>
  );
}

import { useEffect } from "react";

export default function OverlayStateUpdater({ onChange, onDrop }) {
  useEffect(() => {
    const handle_drag_enter = (e) => {
      e.preventDefault();
      onChange(true);
    };

    const handle_drag_leave = (e) => {
      e.preventDefault();
      //   setIsDragging(false);

      if (e.relatedTarget === null) {
        onChange(false);
      }
    };

    const handle_drag_over = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handle_drop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onChange(false);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const droppedFile = e.dataTransfer.files[0]; // Only use the first file
        onDrop([droppedFile]);
        e.dataTransfer.clearData();
      }
    };

    const window_listner = () => {
      window.addEventListener("dragenter", handle_drag_enter);
      window.addEventListener("dragleave", handle_drag_leave);
      window.addEventListener("dragover", handle_drag_over);
      window.addEventListener("drop", handle_drop);
    };

    window_listner();

    return () => {
      window_listner();
    };
  }, [onDrop]);

  return null;
}

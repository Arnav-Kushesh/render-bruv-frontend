import generateRenderInstructions from "./generateRenderInstructions";
import getSocketConnection from "./getSocketConnection";

export default function startRender({
  podId,
  baseUrl,
  renderSettings,
  executionData,
}) {
  let renderInstruction = generateRenderInstructions(renderSettings);

  let blend_file = executionData?.blend_file;

  if (!blend_file) return window.popupAlert("Blend file not found");

  let socket = getSocketConnection({ podId, baseUrl });

  if (executionData.render_status === false && blend_file) {
    socket.emit("blend_engine", {
      data_sync: renderInstruction,
    });
  }
}

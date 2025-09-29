import { io } from "socket.io-client";

export default function getSocketConnection({ podId, baseUrl }) {
  if (!window.socketConnections) window.socketConnections = {};

  let socketConnections = window.socketConnections;

  let existingConnection = socketConnections[podId];
  if (existingConnection) return existingConnection;

  socketConnections[podId] = io(baseUrl, {
    autoConnect: true,
    withCredentials: true,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 100,
    reconnectionDelay: 1000,
    rememberUpgrade: true,
  });

  let theSocket = socketConnections[podId];

  // When the page is about to unload, tell the server and fully disconnect.
  const handleBeforeUnload = () => {
    // Optional: emit a custom event if you want the server to distinguish
    // a "clean" client disconnect vs. a crash/timeout.
    theSocket.emit("client_disconnect");
    // Actually disconnect the socket so it won't try to reconnect
    theSocket.disconnect();
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  // If you ever destroy/reinitialize socket in-app,
  // cleanup the listener too:
  theSocket.on("disconnect", () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  });
}

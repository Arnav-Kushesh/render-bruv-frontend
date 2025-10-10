import { io } from "socket.io-client";

export default function terminateSocketConnection(podId) {
  if (!window.socketConnections) window.socketConnections = {};

  let socketConnections = window.socketConnections;

  let existingConnection = socketConnections[podId];
  if (existingConnection) return existingConnection;

  let theSocket = socketConnections[podId];

  if (!theSocket) return null;

  console.log("terminating socket connection", podId);

  theSocket.emit("client_disconnect");
  theSocket.disconnect();
}

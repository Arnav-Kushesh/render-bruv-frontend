import { serverLine } from "../../../../../controllers/network/serverLine";

export default function checkServerIsReady({
  baseUrl,
  serverIsReady,
  setServerIsReady,
  setExecutionData,
}) {
  if (window.serverReadyCheckInterval)
    window.clearInterval(window.serverReadyCheckInterval);

  if (!serverIsReady) {
    window.serverReadyCheckInterval = window.setInterval(async () => {
      try {
        let newExecutionData = await serverLine.get(baseUrl + "/get_db");
        setExecutionData(newExecutionData);
        setServerIsReady(true);
      } catch (e) {
        console.log("server is not yet ready");
      }
    }, 3000);
  }
}

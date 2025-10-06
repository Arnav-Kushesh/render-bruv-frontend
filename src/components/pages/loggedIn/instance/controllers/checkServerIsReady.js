import axios from "axios";
import { serverLine } from "../../../../../controllers/network/serverLine";

export default function checkServerIsReady({
  baseUrl,
  serverIsReady,
  setServerIsReady,
  setExecutionData,
}) {
  console.log("server ready check started", serverIsReady);
  if (window.serverReadyCheckInterval)
    window.clearInterval(window.serverReadyCheckInterval);

  if (!serverIsReady) {
    window.serverReadyCheckInterval = window.setInterval(async () => {
      try {
        const res = await axios.post(
          `${baseUrl}/get_db`,
          {},
          { withCredentials: true }
        );

        setExecutionData(res.data);
        setServerIsReady(true);
      } catch (e) {
        console.log("server is not yet ready");
      }
    }, 3000);
  }
}

import axios from "axios";
import { serverLine } from "../../../../../controllers/network/serverLine";

export default function checkServerIsReady({
  baseUrl,
  serverIsReady,
  setServerIsReady,
  setExecutionData,
  setExecutionDataIsLoading,
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

        setExecutionDataIsLoading(false);
        setExecutionData(res.data);
        setServerIsReady(true);
      } catch (e) {
        setExecutionDataIsLoading(false);
        console.log("server is not yet ready");
      }
    }, 3000);
  }
}

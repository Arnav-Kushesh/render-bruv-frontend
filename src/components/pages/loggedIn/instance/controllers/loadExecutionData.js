import axios from "axios";
import { serverLine } from "../../../../../controllers/network/serverLine";

export default async function loadExecutionData({
  baseUrl,
  setExecutionData,
  setExecutionDataIsLoading,
}) {
  //   let newExecutionData = await serverLine.get(baseUrl + "/get_db");

  setExecutionDataIsLoading(true);
  try {
    const res = await axios.post(
      `${baseUrl}/get_db`,
      {},
      { withCredentials: true }
    );

    setExecutionData(res.data);
    setExecutionDataIsLoading(false);
  } catch (e) {
    setExecutionDataIsLoading(false);
    console.log("server not ready");
  }
}

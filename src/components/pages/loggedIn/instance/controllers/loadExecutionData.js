import axios from "axios";
import { serverLine } from "../../../../../controllers/network/serverLine";

export default async function loadExecutionData({
  baseUrl,
  setExecutionData,
  setExecutionDataIsLoading,
}) {
  //   let newExecutionData = await serverLine.get(baseUrl + "/get_db");

  setExecutionDataIsLoading(true);
  const res = await axios.post(
    `${baseUrl}/get_db`,
    {},
    { withCredentials: true }
  );

  setExecutionData(res.data);
  setExecutionDataIsLoading(false);
}

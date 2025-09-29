import { serverLine } from "../../../../../controllers/network/serverLine";

export default async function loadExecutionData({ baseUrl, setExecutionData }) {
  let newExecutionData = await serverLine.get(baseUrl + "/get_db");
  setExecutionData(newExecutionData);
}

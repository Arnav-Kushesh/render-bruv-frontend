import axios from "axios";
import { serverLine } from "../../../../../controllers/network/serverLine";

export default async function loadExecutionData({ baseUrl, setExecutionData }) {
  //   let newExecutionData = await serverLine.get(baseUrl + "/get_db");

  const res = await axios.post(
    `${baseUrl}/get_db`,
    {},
    { withCredentials: true }
  );

  setExecutionData(res.data);
}

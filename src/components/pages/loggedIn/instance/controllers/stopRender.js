import axios from "axios";

export default function stopRender({
  baseUrl,
  executionData,
  refreshExecutionData,
}) {
  if (executionData.render_status) {
    axios
      .post(`${baseUrl}/stop_render`, {}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          refreshExecutionData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

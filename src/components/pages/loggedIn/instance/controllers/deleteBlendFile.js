import axios from "axios";

export default function deleteBlendFile({
  setDeleteLoading,
  baseUrl,
  refreshExecutionData,
  setUploadPercentage,
}) {
  setDeleteLoading(true);
  axios
    .post(`${baseUrl}/delete_blend_file`, {}, { withCredentials: true })
    .then(async (res) => {
      if (res.status === 200) {
        await refreshExecutionData();
        setDeleteLoading(false);
        // console.log(upload_percentage)
        setUploadPercentage(0);
      }
    })
    .catch((err) => {
      setDeleteLoading(false);
      console.log(err);
      refreshExecutionData();
    });
}

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
    .then((res) => {
      if (res.status === 200) {
        setDeleteLoading(false);
        // console.log(upload_percentage)
        setUploadPercentage(0);
        refreshExecutionData();
      }
    })
    .catch((err) => {
      setDeleteLoading(false);
      console.log(err);
      refreshExecutionData();
    });
}

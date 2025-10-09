import axios from "axios";
import pLimit from "p-limit";

export default async function uploadBlendFile({
  files,
  setUploadPercentage,
  baseUrl,
  refreshExecutionData,
  setLoading,
}) {
  const file = files[0];
  const CHUNK_SIZE = 5 * 1024 * 1024; //5MB
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const fileId = `${Date.now()}${Math.random().toString(36).slice(2, 11)}`;

  setUploadPercentage(0);
  setLoading(true);

  try {
    // First, send chunk 0 to establish session
    const firstChunk = file.slice(0, Math.min(CHUNK_SIZE, file.size));
    const firstFormData = new FormData();
    firstFormData.append("file", firstChunk);
    firstFormData.append("chunk_index", "0");
    firstFormData.append("total_chunks", totalChunks.toString());
    firstFormData.append("file_name", file.name);
    firstFormData.append("file_id", fileId);

    await axios.post(`${baseUrl}/upload_blend_file`, firstFormData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    let uploadedChunks = 1;
    setUploadPercentage(Math.round((1 * 100) / totalChunks));

    // If only one chunk, we're done
    if (totalChunks === 1) {
      await refreshExecutionData();
      setLoading(false);
      return;
    }

    // Now send remaining chunks in parallel
    const limit = pLimit(10);
    const remainingPromises = Array.from(
      { length: totalChunks - 1 },
      (_, i) => {
        const chunkIndex = i + 1;
        return limit(async () => {
          const start = chunkIndex * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          const formData = new FormData();
          formData.append("file", chunk);
          formData.append("chunk_index", chunkIndex.toString());
          formData.append("total_chunks", totalChunks.toString());
          formData.append("file_name", file.name);
          formData.append("file_id", fileId);

          const response = await axios.post(
            `${baseUrl}/upload_blend_file`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            }
          );

          uploadedChunks++;
          const percentage = Math.round((uploadedChunks * 100) / totalChunks);
          setUploadPercentage(percentage);

          return response;
        });
      }
    );

    console.log("Called all promises");
    await Promise.all(remainingPromises);
    console.log("All promises done");
    await refreshExecutionData();
    console.log("Upload Complete-----");
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error("❌ Upload failed:", error);
    setUploadPercentage(0);
    refreshExecutionData();
  }

  setLoading(false);
}

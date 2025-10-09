import { SiBlender } from "react-icons/si";
import CustomButton from "../../../helperComponents/CustomButton";
import { useCallback, useState } from "react";
import { MoonLoader, PuffLoader, PulseLoader } from "react-spinners";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import uploadBlendFile from "./controllers/uploadBlendFile";
import UploadFileButton from "./UploadFileButton";
import MessageBox from "../../../helperComponents/MessageBox";
import { createPortal } from "react-dom";
import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";
import CustomLabelDim from "../../../applicationUI/customLabel/CustomLabelDim";
import OverlayStateUpdater from "./OverlayStateUpdater";
import deleteBlendFile from "./controllers/deleteBlendFile";

let btnStyle = {
  border: "1px solid var(--elementDim2)",
  borderRadius: "15px",
  background: "transparent",
  padding: "15px 55px",
  width: "100%",
};

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: var(--activeSurface);
  color: var(--activeElement);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteCurrentBlendFile = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  /* width: 100%; */
  overflow: hidden;
  border-radius: 15px;
  /* width: 100%; */

  &::after {
    content: "Delete Blend File";
    background: var(--activeSurface);
    position: absolute;
    top: 0;
    font-weight: 700;
    color: var(--activeElement);
    right: 0;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    border: 1px solid var(--elementDim2);
    opacity: 0;
    transition: 0.15s ease-in-out;
    transform: translateX(-100%);
  }

  &:hover {
    &::after {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Overlay = () => {
  return createPortal(
    <OverlayContainer>
      <MessageBox>Drop the files here ...</MessageBox>
    </OverlayContainer>,
    document.getElementById("dragdrop")
  );
};

export default function BlendFileUploadSection({
  refreshExecutionData,
  executionData,
  baseUrl,
}) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  let blendFile = executionData?.blend_file;

  const onDrop = useCallback(async (files) => {
    await uploadBlendFile({
      files,
      setUploadPercentage,
      baseUrl,
      refreshExecutionData,
      setLoading,
    });
  });

  const onDropRejected = (fileRejections) => {
    setUploadPercentage(false);
    fileRejections.forEach((rejection) => {
      console.error("Rejected file:", rejection.file.name);
      rejection.errors.forEach((e) => {
        console.error(e.code, e.message);
      });
    });
  };

  //Don't use the isDragging variable from useDropZone
  //It flickers
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    accept: {
      "application/x-blender": [".blend"],
    },
    maxSize: 20 * 1024 * 1024 * 1024,
  });

  if (deleteLoading)
    return (
      <CustomButton style={btnStyle} icon={<PuffLoader size={"18px"} />}>
        {" "}
        Deleting
      </CustomButton>
    );

  if (loading)
    return (
      <CustomButton style={btnStyle} icon={<PuffLoader size={"18px"} />}>
        {" "}
        Uploading → {uploadPercentage}%
      </CustomButton>
    );

  if (blendFile?.is_present) {
    return (
      <DeleteCurrentBlendFile onClick={deleteOldBlendFile}>
        <CustomButton
          style={{ ...btnStyle, pointerEvents: "none" }}
          icon={<SiBlender />}
        >
          {blendFile.file_name}
        </CustomButton>
      </DeleteCurrentBlendFile>
    );
  }

  return (
    <div {...getRootProps()}>
      <OverlayStateUpdater onChange={setShowOverlay} onDrop={onDrop} />
      {showOverlay && <Overlay />}

      <UploadFileButton style={{ ...btnStyle }}>
        <SiBlender />
        Upload Blender File
      </UploadFileButton>
      <CustomLabelDim
        style={{ textTransform: "unset", fontSize: "11px", fontWeight: "550" }}
      >
        Drag n drop here
      </CustomLabelDim>
      <input {...getInputProps()}></input>
    </div>
  );

  function deleteOldBlendFile() {
    deleteBlendFile({
      baseUrl,
      setDeleteLoading,
      setUploadPercentage,
      refreshExecutionData,
    });
  }
}

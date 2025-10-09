import { styled } from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";

import selectFile from "../../controllers/selectFile.js";
import compressAndUploadFile from "../../controllers/compressAndUploadFile.js";
import { serverLine } from "../../controllers/network/serverLine.js";

import Context from "../../Context.js";

import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineUpload,
} from "react-icons/ai/index.js";

import ProfilePicture from "../helperComponents/ProfilePicture.js";
import ShowSelectedImage from "../helperComponents/ShowSelectedImage.js";

import MaterialInput from "../helperComponents/MaterialInput.js";
import CustomButton from "../helperComponents/CustomButton.js";

import LoadingSection from "../helperComponents/LoadingSection.js";

import DropDownLocationInput from "../helperComponents/DropDownLocationInput.js";
import getImageURL from "../../controllers/getImageURL.js";
import { PiFileDocLight } from "react-icons/pi";
import { BiCamera } from "react-icons/bi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0;
  width: 100%;

  gap: 10px;
  align-items: center;
`;

const Button = styled.div`
  width: 100%;
  font-size: 18px;
  border: 1px solid var(--borderDim);
  background: var(--surface2);
  border-radius: 15px;
  color: var(--element);
  text-align: center;
  cursor: pointer;
  padding: 20px 15px;
`;

const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 25px;
  /* width: 100%; */
  justify-content: center;
  align-items: center;
`;

const FileUploadSection = styled.div`
  display: flex;
  flex-direction: row;

  position: relative;
  gap: 15px;
  /* width: 100%; */
  justify-content: center;
  align-items: center;
`;

const FloatingButtons = styled.div`
  /* width: 300px; */
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const FloatingButton = styled(Button)`
  width: 50px;
  background: var(--activeSurface);
  backdrop-filter: blur(20px);
  box-shadow: var(--hardShadow);
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  height: 50px;
  color: var(--activeElement);

  transition: all 0.2s ease-in-out;
  border: 1px solid var(--borderDim);

  &:hover {
    transform: scale(1.2);
    box-shadow: var(--lightShadow);
  }
`;

const Image = styled.img`
  height: 350px;
  width: 100%;
  object-fit: cover;
  border-radius: 20px;

  ${({ forPerson }) => {
    if (forPerson)
      return `
      width: 250px;
      height: 250px;

    `;
  }}
`;

const ImageParent = styled.div`
  height: 350px;
  width: 100%;
  position: relative;
  object-fit: cover;
  border-radius: 10px;

  ${({ forPerson }) => {
    if (forPerson)
      return `
      width: 250px;
      height: 250px;

    `;
  }}
`;

const Circle = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 100px;
  background: var(--surface2);
  border: 1px solid var(--borderIntense);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: var(--element);
`;

export default function ImagePicker({
  value,
  onChange,
  isFile,
  label,
  uploadButtonStyle,
  imagePreviewStyle,
  forPerson,
}) {
  const [loading, setLoading] = useState(false);

  if (loading)
    return (
      <FileUploadSection>
        <LoadingSection />
      </FileUploadSection>
    );

  if (isFile) {
    if (value) {
      return (
        <FileUploadSection>
          <CustomButton href={getImageURL(value)}>Open {label}</CustomButton>
          <CustomButton onClick={chooseImage} icon={<PiFileDocLight />}>
            Upload File
          </CustomButton>
        </FileUploadSection>
      );
    }

    return (
      <FileUploadSection>
        <CustomButton onClick={chooseImage} icon={<PiFileDocLight />}>
          Upload File
        </CustomButton>
      </FileUploadSection>
    );
  } else {
    if (value) {
      if (value.type !== "DEFAULT")
        return (
          <ImageUploadSection>
            <ImageParent forPerson={forPerson}>
              <Image
                src={getImageURL(value)}
                forPerson={forPerson}
                style={imagePreviewStyle}
              />
              <FloatingButtons>
                <FloatingButton onClick={removeImage}>
                  <AiOutlineClose />
                </FloatingButton>

                <FloatingButton onClick={chooseImage}>
                  <AiOutlineUpload />
                </FloatingButton>
              </FloatingButtons>
            </ImageParent>
          </ImageUploadSection>
        );
    }

    return (
      <ImageUploadSection>
        <Circle onClick={chooseImage} style={uploadButtonStyle}>
          <BiCamera />
        </Circle>
      </ImageUploadSection>
    );
  }

  async function removeImage() {
    onChange(null);
  }

  async function chooseImage() {
    let config = { onlyImage: true };

    if (isFile) {
      config = { onlyImageAndPDF: true };
    }

    let selectedImages = await selectFile(config);
    let fileData = await uploadImage(selectedImages);
    if (fileData) {
      onChange({
        type: "S3_UPLOAD",
        data: fileData.fileName,
      });
    }
  }

  async function uploadImage(selectedImages) {
    if (!selectedImages) return null;
    if (!selectedImages.length) return null;
    setLoading(true);
    console.log("Uploading Image");

    let newFile = await compressAndUploadFile(null, selectedImages[0], isFile);

    setLoading(false);
    return newFile;
  }
}

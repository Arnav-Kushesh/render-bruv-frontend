import PopupImageUploader from "../components/editors/PopupImageUploader";

export default function openImageUploaderPopup() {
  return new Promise((resolve) => {
    window.setForm({
      title: `Upload Image`,
      component: <PopupImageUploader callback={resolve} />,
    });
  });
}

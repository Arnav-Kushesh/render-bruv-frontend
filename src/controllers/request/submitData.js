import { serverLine } from "../network/serverLine";

export default async function submitData({
  method,
  path,
  data,
  setLoading,
  onSuccess,
  onSuccessMessage = "Done",
}) {
  if (setLoading) setLoading(true);

  let func = serverLine[method];

  try {
    let newData = await func(path, data);
    if (setLoading) setLoading(false);
    window.popupAlert(onSuccessMessage);
    if (onSuccess) {
      onSuccess = onSuccess.bind(this);
      console.log(onSuccess);
      onSuccess(newData);
    }
    return newData;
  } catch (e) {
    console.log(e);
    window.popupAlert(e.message);
    if (setLoading) setLoading(false);
    return null;
  }
}

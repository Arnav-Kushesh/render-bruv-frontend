import loginWithGoogleForWeb from "./loginWithGoogleForWeb";

export default async function loginWithGoogle(setLoading) {
  try {
    //we don't do loading part here because of api limitation and it will look bad
    await loginWithGoogleForWeb();
  } catch (e) {
    window.popupAlert(JSON.stringify(e.message));
    window.popupAlert(JSON.stringify(e));
    if (typeof setLoading == "function") setLoading(false);
  }
}

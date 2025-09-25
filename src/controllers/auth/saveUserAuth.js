import goTo from "../goTo";

export default async function saveUserAuth(data) {
  if (data) {
    localStorage.setItem("render-bruv-token", data.token);
    localStorage.setItem("render-bruv-userId", data.userId);

    window.doInitialLoad().then(() => {
      goTo("/")();
    });
  }
}

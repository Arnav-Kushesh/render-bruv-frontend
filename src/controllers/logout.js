
import goTo from "./goTo";

async function logout() {



  localStorage.removeItem('render-bruv-color-mode');
  localStorage.removeItem('render-bruv-token');
  localStorage.removeItem('render-bruv-userId');

  //Removes cache and

  // window.location = window.location.origin;

  window.setTimeout(() => {
    goTo("/")();
    window.doInitialLoad();
  }, 300);

  // window.setTimeout(() => {
  //   goTo("/")();
  // }, 500);

  // serverLine.delete("/cookie").then(() => {
  // window.location = window.location.origin;
  // });
}

export default logout;

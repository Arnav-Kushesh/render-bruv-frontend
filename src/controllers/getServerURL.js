

let productionServer = "https://render-bruv-backend.upon.one";
let devServer = "http://192.168.23.226:8080";

function getServerURL() {


  devServer = `http://${window.location.hostname}:8080`;
  // if (platform == "web") devServer = "http://localhost:8080";

  let base = productionServer;

  if (window.location.origin.indexOf("localhost") !== -1) {
    base = devServer;
  }

  if (window.location.origin.indexOf("192.168") !== -1) {
    base = devServer;
  }



  // console.log(base);
  return base;
}

export default getServerURL;

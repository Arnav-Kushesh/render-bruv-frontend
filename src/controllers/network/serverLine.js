import getServerURL from "../getServerURL.js";
import logout from "../logout.js";

class ServerLine {
  get(route) {
    return executer(route);
  }

  post(route, body) {
    return executer(route, body, "POST");
  }

  delete(route) {
    return executer(route, null, "DELETE");
  }

  patch(route, body) {
    return executer(route, body, "PATCH");
  }
}

async function executer(route, body, method) {
  // throw Error("User not found");

  if (route[0] !== "/")
    throw Error(`Serverline route should start with "/" Fix this -> ${route} `);

  let requestType = "GET";
  if (body) requestType = "POST";
  if (method) requestType = method;

  let authToken = localStorage.getItem("render-bruv-token");

  let headerParam = {
    // withCredentials: true,
    authorization: authToken ? JSON.stringify({ authToken }) : null,
    "Content-type": "application/json",
  };

  let requestObject = {
    mode: "cors",
    method: requestType,
    headers: headerParam,
  };

  if (body) requestObject.body = JSON.stringify(body);

  // console.log(process.env);
  let base = getServerURL();

  route = base + "/api/v1" + route;
  // console.log(route);
  // console.log(route);

  let res = await fetch(route, requestObject);

  let jsonData = await res.json();

  if (jsonData.error) {
    if (jsonData.error === "Invalid user") {
      logout();
    } else if (jsonData.error === "Login Required") {
      window.popupAlert("Please! Login");
      throw Error(jsonData.error);
    } else {
      throw Error(jsonData.error);
    }
  }
  return jsonData.data;
}

const serverLine = new ServerLine();

export { serverLine };

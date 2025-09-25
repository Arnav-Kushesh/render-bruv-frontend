import { serverLine } from "../network/serverLine";
import saveUserAuth from "./saveUserAuth";

export default async function uploadGoogleAuthAccessToken(accessToken) {
  let data = await serverLine.post("/google-auth-access-token", {
    accessToken,
  });

  if (data) saveUserAuth(data);
}

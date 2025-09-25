import { useGoogleLogin } from "@react-oauth/google";
import uploadGoogleAuthAccessToken from "./uploadGoogleAuthAccessToken";

export default function loginWithGoogleForWeb() {
  window.doGoogleLoginForWeb();
}

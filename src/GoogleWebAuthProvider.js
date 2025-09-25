import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleWebAuthProvider({ children }) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_AUTH_WEB_CLIENT_ID}
    >
      {children}
    </GoogleOAuthProvider>
  );
}

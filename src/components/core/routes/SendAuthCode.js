import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import Context from "../../../Context.js";
import { serverLine } from "../../../controllers/network/serverLine.js";
import { useSearchParams } from "react-router-dom";
import BrandContainer from "../../brand/BrandContainer.js";
import LoadingSection from "../../helperComponents/LoadingSection.js";
import saveUserAuth from "../../../controllers/auth/saveUserAuth.js";
import BrandContainerThemed2d from "../../brand/BrandContainerThemed2d.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  /* margin-top: 100px; */
  justify-content: center;
  height: 100%;
  align-items: center;
  width: 100vw;
  height: 100dvh;
`;

const ErrorBox = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 500px;
`;

function SendAuthCode() {
  const [searchParams] = useSearchParams();
  let { dispatch } = useContext(Context);
  let [error, setError] = useState(false);

  useEffect(() => {
    console.log("req sending auth code");
    sendCode();
  }, []);

  if (error) return <ErrorBox>{error}</ErrorBox>;
  return (
    <Container>
      <BrandContainerThemed2d />
      <LoadingSection />
    </Container>
  );

  function sendCode() {
    console.log("sending auth code");
    let location = window.location.origin + window.location.pathname;
    let code = searchParams.get("code");

    serverLine
      .post("/login-with-google", { code, location })
      .then(saveUserAuth)
      .catch(({ message }) => {
        if (typeof message == "object") message = JSON.stringify(message);
        setError(message);
      });
  }
}

export default SendAuthCode;

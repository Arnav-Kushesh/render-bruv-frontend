import { useContext, useState } from "react";
import styled from "styled-components";
import MaterialInput from "../../../helperComponents/MaterialInput";
import extractEventValue from "../../../../controllers/utils/extractEventValue";
import InputCard from "../../../helperComponents/InputCard";
import getUrlQuery from "../../../../controllers/getUrlQuery";
import MessageBox from "../../../helperComponents/MessageBox";
import LoadingSection from "../../../helperComponents/LoadingSection";
import { serverLine } from "../../../../controllers/network/serverLine";
import saveUserAuth from "../../../../controllers/auth/saveUserAuth";
import LoggedInBoilerplate from "../../loggedIn/LoggedInBoilerplate";
import Context from "../../../../Context";
import LoggedOutBoilerplate from "../LoggedOutBoilerplate";

const options = [
  { value: "LOGIN", label: "Login" },
  { value: "SIGNUP", label: "Signup" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  align-items: center;
  padding-bottom: 30px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: flex-end;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 23px;
  color: var(--accent);
`;

const Medium = styled.div`
  /* font-weight: 900; */
  opacity: 0.4;
  font-size: 15px;
  text-align: center;
  color: var(--accent);
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
`;

export default function ChangePassword() {
  const { loggedInUser } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState();
  

  let core = (
    <>
      <MaterialInput
        label={"Password"}
        type="password"
        // placeholder={"Type Password Here"}
        value={password}
        onChange={extractEventValue(setPassword)}
      />

      <MaterialInput
        label={"Confirm Password"}
        type="password"
        // placeholder={"Type Confirm Password Here"}
        value={confirmPassword}
        onChange={extractEventValue(setConfirmPassword)}
      />
    </>
  );

  if (loading) core = <LoadingSection />;

  if (done) core = <MessageBox>Done</MessageBox>;

  let Comp = LoggedInBoilerplate;

  if (!loggedInUser) {
    Comp = LoggedOutBoilerplate;
  }

  return (
    <Comp titleLine1={"Change"} titleLine2={"Password"}>
      <Container>
        <InputCard
          title={"Type the new password"}
          // desc="Type in your new password"
          submitButtonText={"Submit"}
          onSubmit={changePassword}
        >
          {core}
        </InputCard>
      </Container>
    </Comp>
  );

  async function changePassword() {
    let urlQueries = getUrlQuery();
    let email = urlQueries.email;
    let code = urlQueries.code;

    setLoading(true);

    try {
      let data = await serverLine.post("/change-password", {
        email,
        code,
        password,
        confirmPassword,
      });
      window.popupAlert("Done");
      setLoading(false);
      saveUserAuth(data);
      setDone(true);
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}

import { useContext, useEffect, useState } from "react";

import OnboardingBoilerplate from "./OnboardingBoilerplate";
import CustomToggle from "../../../helperComponents/CustomToggle";
import styled from "styled-components";
import { serverLine } from "../../../../controllers/network/serverLine";
import Context from "../../../../Context";
import AnimatedPillTabs from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs";

const options = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "Other", label: "Other" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

export default function AskGender({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const [gender, setGender] = useState("MALE");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.gender) setGender(loggedInUser.gender);
    }
  }, []);

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Gender"
      title={"You are?"}
      onSubmit={onSubmit}
      loading={loading}
    >
      <Container>
        <AnimatedPillTabs tabs={options} value={gender} onChange={setGender} />
      </Container>
    </OnboardingBoilerplate>
  );

  async function onSubmit() {
    setLoading(true);

    try {
      await serverLine.patch("/me", {
        changes: { gender },
      });
      setLoading(false);
      let newLoggedInUser = { ...loggedInUser, gender };
      setLoggedInUser(newLoggedInUser);
      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}

import { useContext, useEffect, useState } from "react";

import OnboardingBoilerplate from "./OnboardingBoilerplate";
import extractEventValue from "../../../../controllers/utils/extractEventValue";
import MaterialInput from "../../../helperComponents/MaterialInput";
import styled from "styled-components";
import { serverLine } from "../../../../controllers/network/serverLine";
import Context from "../../../../Context";
import AnimatedPillTabsVertical from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabsVertical";

const options = [
  { value: "MALE", label: "Mr" },
  { value: "FEMALE", label: "Mme" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  width: 100%;
`;

export default function AskExperience({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const [experience, setExperience] = useState("NEW");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser.experience) setExperience(loggedInUser.experience);
  }, [loggedInUser]);

  let title = "Tell us a bit about your experience with blender and 3D design";

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Signup Source"
      title={title}
      onSubmit={onSubmit}
      loading={loading}
      disableSkip={true}
    >
      <Container>
        <AnimatedPillTabsVertical
          tabs={[
            { label: "New (No previous experience)", value: "NEW" },
            { label: "Beginner (< 1 year) ", value: "BEGINNER" },
            { label: "Intermediate (1 to 3 Years)", value: "INTERMEDIATE" },
            { label: "Advanced (More than 3 Years)", value: "ADVANCED" },
          ]}
          value={experience}
          onChange={setExperience}
        />
      </Container>
    </OnboardingBoilerplate>
  );

  async function onSubmit() {
    if (!experience) return window.popupAlert("Please type at lest 2 words");
    if (experience.length < 4)
      return window.popupAlert("Please! type at lest 2 words");

    setLoading(true);

    try {
      await serverLine.patch("/me", {
        changes: { experience },
      });
      setLoading(false);
      let newLoggedInUser = { ...loggedInUser, experience };
      setLoggedInUser(newLoggedInUser);
      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}

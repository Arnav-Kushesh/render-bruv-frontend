import { useContext, useEffect, useState } from "react";

import CustomDateInput from "../../../helperComponents/CustomDateInput";
import OnboardingBoilerplate from "./OnboardingBoilerplate";
import { serverLine } from "../../../../controllers/network/serverLine";
import Context from "../../../../Context";
import styled from "styled-components";

let thisDate = new Date();

const MobileDateInput = styled.div`
  border-radius: 10px;
  overflow: hidden;
  //To get rid of the grey part
  @media (min-width: 900px) {
    display: none;
  }
`;

export default function AskDob({ asEditPage }) {
  const { loggedInUser, setLoggedInUser, colorMode } = useContext(Context);
  const [dob, setDob] = useState(thisDate.toISOString());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.dateOfBirth) setDob(loggedInUser.dateOfBirth);
    }
  }, []);

  let title = "Date of birth";

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Dob"
      skipID={"dateOfBirthOnboardingSkipped"}
      // desc={"Please! select"}
      title={title}
      onSubmit={onSubmit}
      loading={loading}
    >
      <CustomDateInput
        style={{ justifyContent: "center" }}
        label=""
        value={dob}
        onChange={setDob}
      />
    </OnboardingBoilerplate>
  );

  async function onSubmit() {
    if (!dob) return window.popupAlert("Please! enter age");
    let age = calculateAge(dob);
    if (age < 7) return window.popupAlert("Age is too low");

    setLoading(true);
    try {
      await serverLine.patch("/me", { changes: { dateOfBirth: dob } });
      setLoading(false);
      let newLoggedInUser = { ...loggedInUser, dateOfBirth: dob };
      window.popupAlert("Saved");
      setLoggedInUser(newLoggedInUser);
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }

  function calculateAge(dateOfBirthStr) {
    let dateOfBirth = new Date(dateOfBirthStr);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();

    // If the current month is before the birth month or
    // if it's the same month but the day is before the birth day,
    // then subtract one from the age.
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }

    return age;
  }
}

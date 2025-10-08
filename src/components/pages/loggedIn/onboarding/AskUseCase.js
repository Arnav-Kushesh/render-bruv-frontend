import { useContext, useEffect, useState } from "react";

import OnboardingBoilerplate from "./OnboardingBoilerplate";
import extractEventValue from "../../../../controllers/utils/extractEventValue";
import MaterialInput from "../../../helperComponents/MaterialInput";
import styled from "styled-components";
import { serverLine } from "../../../../controllers/network/serverLine";
import Context from "../../../../Context";

const options = [
  { value: "MALE", label: "Mr" },
  { value: "FEMALE", label: "Mme" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
`;

export default function AskUseCase({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const [useCase, setUseCase] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser.useCase) setUseCase(loggedInUser.useCase);
  }, [loggedInUser]);

  let title = "Tell us a bit about your use case";

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Signup Source"
      desc={
        "Is it related to motion graphics, architecture, product design, character animation or something else?"
      }
      title={title}
      onSubmit={onSubmit}
      loading={loading}
      disableSkip={true}
    >
      <Container>
        <MaterialInput
          label={"Type Here"}
          // placeholder={
          //   ""
          // }
          value={useCase}
          multiline={true}
          rows={3}
          onChange={extractEventValue(setUseCase)}
        />
      </Container>
    </OnboardingBoilerplate>
  );

  async function onSubmit() {
    if (!useCase) return window.popupAlert("Please type at lest 2 words");
    if (useCase.length < 4)
      return window.popupAlert("Please! type at lest 2 words");

    setLoading(true);

    try {
      await serverLine.patch("/me", {
        changes: { useCase },
      });
      setLoading(false);
      let newLoggedInUser = { ...loggedInUser, useCase };
      setLoggedInUser(newLoggedInUser);
      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}

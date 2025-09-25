import { useContext, useEffect, useState } from "react";

import OnboardingBoilerplate from "./OnboardingBoilerplate";
import MaterialInput from "../../../helperComponents/MaterialInput";
import styled from "styled-components";
import { serverLine } from "../../../../controllers/network/serverLine";
import Context from "../../../../Context";
import CustomLabel from "../../../applicationUI/CustomLabel";

const options = [
  { value: "MALE", label: "Mr" },
  { value: "FEMALE", label: "Mme" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: flex-start;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export default function AskContactInfo({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const [contactInfo, setContactInfo] = useState({
    main: { name: "", number: "" },
    alternative: {
      name: "",
      number: "",
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.contactInfo) setContactInfo(loggedInUser.contactInfo);
    }
  }, []);

  let title = "Contact Info";

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Contact Info"
      desc={"Please enter your contact info"}
      title={title}
      onSubmit={onSubmit}
      loading={loading}
      skipID={"phoneNumbersOnboardingSkipped"}
    >
      <Container>
        <Section>
          <CustomLabel>Main Contact</CustomLabel>
          <MaterialInput
            label={"Who will pickup?"}
            value={contactInfo.main.name}
            onChange={updateField("main", "name")}
          />
          <MaterialInput
            type="number"
            label={"Number"}
            value={contactInfo.main.number}
            onChange={updateField("main", "number")}
          />
        </Section>
        <Section>
          <CustomLabel>Alternative Contact</CustomLabel>
          <MaterialInput
            label={"Who will pickup?"}
            value={contactInfo.alternative.name}
            onChange={updateField("alternative", "name")}
          />
          <MaterialInput
            type="number"
            label={"Number"}
            value={contactInfo.alternative.number}
            onChange={updateField("alternative", "number")}
          />
        </Section>
      </Container>
    </OnboardingBoilerplate>
  );

  function updateField(fieldName, subFieldName) {
    return (e) => {
      let newData = { ...contactInfo };

      newData[fieldName][subFieldName] = e.target.value;

      setContactInfo(newData);
    };
  }

  async function onSubmit() {
    setLoading(true);

    try {
      await serverLine.patch("/me", {
        changes: { phoneNumbers: contactInfo },
      });
      setLoading(false);
      let newLoggedInUser = {
        ...loggedInUser,
        phoneNumbers: contactInfo,
      };
      setLoggedInUser(newLoggedInUser);
      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}

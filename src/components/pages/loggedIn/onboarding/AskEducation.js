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

export default function AskEducation({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const [educationData, setEducationData] = useState({
    school: { instituteName: "", startYear: "", endYear: "" },
    graduation: {
      instituteName: "",
      courseName: "",
      startYear: "",
      endYear: "",
    }, // Bachelor's degree
    postGraduation: {
      instituteName: "",
      courseName: "",
      startYear: "",
      endYear: "",
    }, // Master's degree
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.educationalBackground)
        setEducationData(loggedInUser.educationalBackground);
    }
  }, []);

  let title = "Your educational background";

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Education"
      title={title}
      onSubmit={onSubmit}
      loading={loading}
      skipID={"educationOnboardingSkipped"}
    >
      <Container>
        <Section>
          <CustomLabel>School</CustomLabel>
          <MaterialInput
            label={"Institute Name"}
            value={educationData.school.instituteName}
            onChange={updateField("school", "instituteName")}
          />
          <MaterialInput
            type="year"
            label={"Start Year"}
            value={educationData.school.start}
            onChange={updateField("school", "startYear")}
          />
          <MaterialInput
            type="year"
            label={"End Year"}
            value={educationData.school.endYear}
            onChange={updateField("school", "endYear")}
          />
        </Section>
        <Section>
          <CustomLabel>Graduation Degree</CustomLabel>
          <MaterialInput
            label={"Institute Name"}
            value={educationData.graduation.instituteName}
            onChange={updateField("graduation", "instituteName")}
          />
          <MaterialInput
            label={"Course Name"}
            value={educationData.graduation.courseName}
            onChange={updateField("graduation", "courseName")}
          />
          <MaterialInput
            type="year"
            label={"Start Year"}
            value={educationData.graduation.start}
            onChange={updateField("graduation", "startYear")}
          />
          <MaterialInput
            type="year"
            label={"End Year"}
            value={educationData.graduation.endYear}
            onChange={updateField("graduation", "endYear")}
          />
        </Section>
        <Section>
          <CustomLabel>Post Graduation Degree</CustomLabel>
          <MaterialInput
            label={"Institute Name"}
            value={educationData.postGraduation.instituteName}
            onChange={updateField("postGraduation", "instituteName")}
          />
          <MaterialInput
            label={"Course Name"}
            value={educationData.postGraduation.courseName}
            onChange={updateField("postGraduation", "courseName")}
          />
          <MaterialInput
            type="year"
            label={"Start Year"}
            value={educationData.postGraduation.start}
            onChange={updateField("postGraduation", "startYear")}
          />
          <MaterialInput
            type="year"
            label={"End Year"}
            value={educationData.postGraduation.endYear}
            onChange={updateField("postGraduation", "endYear")}
          />
        </Section>
      </Container>
    </OnboardingBoilerplate>
  );

  function updateField(fieldName, subFieldName) {
    return (e) => {
      let newData = { ...educationData };

      newData[fieldName][subFieldName] = e.target.value;

      setEducationData(newData);
    };
  }

  async function onSubmit() {
    setLoading(true);

    try {
      await serverLine.patch("/me", {
        changes: { educationalBackground: educationData },
      });
      setLoading(false);
      let newLoggedInUser = {
        ...loggedInUser,
        educationalBackground: educationData,
      };
      setLoggedInUser(newLoggedInUser);
      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}

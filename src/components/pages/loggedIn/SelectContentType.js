import styled from "styled-components";
import CustomLabel from "../../applicationUI/CustomLabel";
import LoggedInBoilerplate from "./LoggedInBoilerplate";

import goTo from "../../../controllers/goTo";
import contentPurposeTypes from "../../../data/contentPurposeTypes";
import CustomButton from "../../helperComponents/CustomButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 50px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* width: 300px; */
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export default function SelectContentType() {
  return (
    <LoggedInBoilerplate
      titleLine1={"Select"}
      titleLine2={"Post Type"}
      showBackButton={true}
    >
      <Container>
        <CustomLabel>Select Purpose</CustomLabel>
        <List>
          {contentPurposeTypes.map((item) => {
            return (
              <CustomButton
                style={{
                  width: "170px",
                  border: "1px solid var(--borderIntense)",
                  boxShadow: "0 4px 0 0 var(--shadowIntense)",
                }}
                onClick={goTo(`/manage-post/?defaultPurpose=${item.value}`)}
              >
                {item.label}
              </CustomButton>
            );
          })}
        </List>
      </Container>
    </LoggedInBoilerplate>
  );
}

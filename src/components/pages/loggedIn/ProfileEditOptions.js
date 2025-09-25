import styled from "styled-components";
import LoggedInBoilerplate from "./LoggedInBoilerplate";
import goTo from "../../../controllers/goTo";
import { useContext } from "react";
import Context from "../../../Context";
import CustomButton from "../../helperComponents/CustomButton";
import CustomLabel from "../../applicationUI/CustomLabel";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin-top: 50px;

  @media (max-width: 900px) {
    margin-top: 0;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* width: 14vw; */

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const TypeButton = styled.div`
  border: 1px solid var(--accent);
  background-color: var(--accentSurfaceSubtle);
  color: var(--accent);
  border-radius: 10px;
  padding: 18px 20px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--accentSurface);
    background-color: var(--accentDim);
  }
`;

export default function ProfileEditOptions() {
  const { loggedInUser } = useContext(Context);

  let options = [
    { label: "Username", link: "/edit-username" },
    { label: "Bio", link: "/edit-bio" },
    { label: "Gender", link: "/edit-gender" },
    { label: "Profile Image", link: "/edit-profile-image" },
  ];

  return (
    <LoggedInBoilerplate
      titleLine1={"Profile"}
      titleLine2={"Edit Option"}
      showBackButton={true}
    >
      <Container>
        <CustomLabel>Edit Profile</CustomLabel>
        <List>
          {options.map((item) => (
            <CustomButton
              style={{
                width: "170px",
                border: "1px solid var(--borderIntense)",
                boxShadow: "0 4px 0 0 var(--shadowIntense)",
              }}
              onClick={goTo(item.link)}
            >
              {item.label}
            </CustomButton>
          ))}
        </List>
      </Container>
    </LoggedInBoilerplate>
  );
}

import styled from "styled-components";

import CustomButton from "../../../helperComponents/CustomButton";
import logout from "../../../../controllers/logout";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import { useContext } from "react";
import Context from "../../../../Context";
import TitleBar from "../../../helperComponents/TitleBar";
import LoadingSection from "../../../helperComponents/LoadingSection";
import goTo from "../../../../controllers/goTo";
import { BiCertification, BiLogOut, BiUser } from "react-icons/bi";
import { MdOutlineAddModerator, MdPassword } from "react-icons/md";
import getNavBarOptions from "../../../../data/getNavBarOptions";
import { RiAdminLine, RiProfileLine } from "react-icons/ri";
import adminAccess from "../../../../data/adminAccess";
import { GrDocument } from "react-icons/gr";
import { GoReport } from "react-icons/go";
import ColorThemeSelector from "../ColorThemeSelector";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  align-items: center;
  gap: 50px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
`;

export default function OptionsPage() {
  const { loggedInUser, isMobile, moderatorList } = useContext(Context);

  if (!loggedInUser)
    return (
      <LoggedInBoilerplate showBackgroundImage={true}>
        <TitleBar>Options</TitleBar>
        <LoadingSection />
      </LoggedInBoilerplate>
    );

  let navBarOptions = getNavBarOptions({ loggedInUser });

  if (!isMobile) navBarOptions = [];

  navBarOptions = []; //We don't need it

  if (loggedInUser) {
    if (
      adminAccess.includes(loggedInUser.username) ||
      moderatorList.includes(loggedInUser.username)
    ) {
      navBarOptions.push({
        label: "Admin Page",
        link: "/admin-page",
        icon: <RiAdminLine />,
      });
    }
  }

  let btnStyle = { width: "100%" };

  return (
    <LoggedInBoilerplate
      titleLine1={"More"}
      titleLine2={"Menu"}
      showBackButton={true}
    >
      {/* <TitleBar> Paramètres </TitleBar> */}
      <Container>
        <Inputs>
          {navBarOptions.map((item) => {
            if (item.value == "MORE") return null;
            return (
              <CustomButton
                style={btnStyle}
                key={item.link}
                icon={item.icon}
                onClick={goTo(item.link)}
              >
                {item.label}
              </CustomButton>
            );
          })}

          <CustomButton
            style={btnStyle}
            icon={<RiProfileLine />}
            onClick={goTo("/edit-profile-options")}
          >
            Edit Profile
          </CustomButton>

          <CustomButton style={btnStyle} icon={<BiLogOut />} onClick={logout}>
            Logout
          </CustomButton>

          <CustomButton
            style={btnStyle}
            icon={<BiUser />}
            href={`/u/${loggedInUser.username}`}
          >
            My Profile
          </CustomButton>

          <CustomButton
            style={btnStyle}
            icon={<MdPassword />}
            href={`/change-password`}
          >
            Change Password
          </CustomButton>
          <br />

          <ColorThemeSelector />
        </Inputs>
      </Container>
    </LoggedInBoilerplate>
  );
}

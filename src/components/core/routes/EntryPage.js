import styled from "styled-components";
import { useContext } from "react";
import Context from "../../../Context.js";
import LoggedOutHomePage from "../../pages/loggedOut/landingPage/LoggedOutHomePage.js";
import HomePage from "../../pages/loggedIn/home/HomePage.js";

const Button = styled.button`
  width: auto;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid;
  gap: 25px;
  background-color: var(--element);
  cursor: pointer;
  transition: 0.25s ease-in-out;
  color: var(--mainBackground);
  &:hover {
    transform: scale(0.9);
  }

  @media (min-width: 950px) {
    width: 300px;
  }
`;

const DownloadAppButton = styled(Button)`
  @media (min-width: 950px) {
    display: none;
  }
`;

const H1 = styled.h1`
  font-weight: 900;
  margin-top: 0;
  font-size: 24px;
  width: auto;
  width: 100%;
  margin: 0;

  @media (min-width: 920px) {
    font-size: 24px;
  }
`;

export default function EntryPage() {
  const { loggedInUserId, loginStatus } = useContext(Context);

  if (loginStatus == "LOADING") return null;

  if (!loggedInUserId) return <LoggedOutHomePage />;

  return <HomePage />;
}

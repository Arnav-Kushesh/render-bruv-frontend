import styled from "styled-components";

const LoggedOutSectionTitle = styled.div`
  font-weight: 900;
  font-size: 40px;
  /* text-align: center; */
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  text-transform: uppercase;
  color: var(--accent);

  @media (max-width: 900px) {
    font-size: 30px;
    text-align: center;
  }
`;

export default LoggedOutSectionTitle;

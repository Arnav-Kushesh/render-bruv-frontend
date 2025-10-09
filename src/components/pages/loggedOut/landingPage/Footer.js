import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Context from "../../../../Context";
import ColorThemeSelector from "../../loggedIn/ColorThemeSelector";
import CustomButton from "../../../helperComponents/CustomButton";

const Container = styled.div`
  padding: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--surface);
  /* border: 1px solid var(--border); */
  border-radius: 15px 15px 0 0;
  /* margin-bottom: 20px; */
  /* opacity: 0.5; */
  align-items: center;
  margin-top: 200px;
  overflow: hidden;
  /* position: ; */

  @media (max-width: 900px) {
    margin-top: 0;
    padding-bottom: 150px;
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  color: var(--elementDim);
  opacity: 0.7;
  text-transform: capitalize;

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const RowTitle = styled.div`
  font-size: 17px;
  display: none;
  font-weight: 900;
`;

let variant = null;

export default function Footer() {
  const { isMobile } = useContext(Context);
  const [lang, setLang] = useState(null);

  useEffect(() => {
    setLang(localStorage.getItem("langPreference"));
  }, []);

  let theLang = lang ? lang : "fr";

  console.log(theLang);

  let date = new Date();

  let btnStyle = {
    background: "var(--activeSurface)",
    border: "1px solid var(--border)",
    boxShadow: "none",
  };

  let btnTxtStyle = { fontSize: "8px" };

  if (!isMobile) btnTxtStyle = { fontSize: "9px" };

  return (
    <Container>
      <Row>Copyright © {date.getFullYear()} Render Bruv</Row>

      <Row>v1</Row>
      <br />

      <Row>
        <Links>
          <CustomButton
            style={btnStyle}
            textStyle={btnTxtStyle}
            customVariant={variant}
            href="/privacy-policy"
          >
            Privacy Policy
          </CustomButton>

          <CustomButton
            style={btnStyle}
            textStyle={btnTxtStyle}
            customVariant={variant}
            href="/terms-and-conditions"
          >
            Terms & Conditions
          </CustomButton>
          <CustomButton
            style={btnStyle}
            textStyle={btnTxtStyle}
            customVariant={variant}
            href="/refund-policy"
          >
            Refund Policy
          </CustomButton>
        </Links>
      </Row>

      <ColorThemeSelector />
    </Container>
  );

  async function changeLanguage() {
    localStorage.setItem("langPreference", theLang == "fr" ? "en" : "fr");
    window.location.reload();
  }
}

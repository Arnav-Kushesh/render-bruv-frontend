import styled from "styled-components";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import AnimatedPageVertical from "../../loggedIn/AnimatedPageVertical";
import WhyChooseUs from "./WhyChooseUs";

const PageWrapper = styled.div`
  font-family: "Inter", sans-serif;
  background: #ffffff;
  color: #000000;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
    padding: 40px;
    align-items: flex-start;
  }
`;

const WideContainer = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
    margin: 0;
    width: 100%;
  }
`;

/* Navbar */

const FullLogo = styled.img`
  height: 55px;
`;
const Navbar = styled.nav`
  width: 92%;
  padding: 0;
  margin-top: 60px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileLogo = styled.img`
  display: none;
  height: 45px;

  @media (max-width: 900px) {
    display: block;
    margin-bottom: 30px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  list-style: none;
  gap: 50px;
`;
const NavLink = styled.div`
  cursor: pointer;
  font-size: 16px;
  font-weight: 650;
  color: #111;
  &:hover {
    text-decoration: underline;
  }
`;

export default function LandingPage() {
  return (
    <AnimatedPageVertical additionalStyle={{ background: "#fff" }}>
      <PageWrapper>
        <WideContainer>
          <Navbar>
            <FullLogo
              className="fullLogo2d"
              src="/logo/2d-full-logo.svg"
              alt="Render Bruv Logo"
            />

            <NavLinks>
              <NavLink>Home</NavLink>
              <NavLink>About Us</NavLink>
              <NavLink>Contact Us</NavLink>
              <NavLink>Pricing</NavLink>
              <NavLink>FAQ</NavLink>
            </NavLinks>
          </Navbar>

          <MobileLogo src="/logo/2d-full-logo.svg" alt="Render Bruv Logo" />

          <HeroSection />

          <WhyChooseUs />
        </WideContainer>

        <Footer />
      </PageWrapper>
    </AnimatedPageVertical>
  );
}

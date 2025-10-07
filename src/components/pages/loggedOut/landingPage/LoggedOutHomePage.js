import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { SiMaildotru } from "react-icons/si";
import goTo from "../../../../controllers/goTo";
import loginWithGoogle from "../../../../controllers/auth/loginWithGoogle";
import { useState } from "react";
import LoadingSection from "../../../helperComponents/LoadingSection";
import BrandContainerThemed from "../../../brand/BrandContainerThemed";
import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";
import Footer from "./Footer";

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

const ShortWidth = styled.div`
  width: 75vw;
  margin-top: 20px;

  @media (max-width: 1600px) {
    width: 85vw;
  }

  @media (max-width: 900px) {
    margin: 0;
    width: 100%;
  }
`;

/* Navbar */
const Navbar = styled.nav`
  width: 100%;
  padding: 0;
  margin-top: 60px;
  margin-bottom: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .liquidStyle {
    filter: contrast(1.3);
    height: 100px;
  }

  .fullLogov2 {
    filter: brightness(1.3);
    height: 75px;
  }

  .fullLogo2d {
    /* filter: brightness(1.3); */
    height: 55px;
  }

  .logo {
    height: 50px;
  }

  ul {
    display: flex;
    list-style: none;
    gap: 50px;

    li {
      cursor: pointer;
      font-size: 16px;
      font-weight: 650;
      color: #111;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* Hero Section */
const Hero = styled.section`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  /* text-align: center; */
  width: 100%;
  position: relative;

  @media (min-width: 1024px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    height: 400px;
    justify-content: space-between;
  }
`;

/* Illustration */
const Illustration = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0 0;
  margin-top: -30px;
  filter: contrast(1.1);

  .theGif {
    width: 700px;
    height: 400px;
    object-fit: cover;
    margin-left: -5vw;
    z-index: -1;
  }

  .rollingBall {
    width: 500px !important;
  }

  @media (max-width: 900px) {
    width: 250px;
    max-width: 100%;
    position: relative;

    .theGif {
      width: 80vw !important;
      height: 300px;
      margin-top: 30px;
    }
  }
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 15px;
  align-items: flex-start;

  left: 0;
  top: 0;
  z-index: 2;

  @keyframes gradientMove {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  h1 {
    font-size: 35px;
    font-weight: 900;

    margin: 0 0;
    color: #000;

    span.highlightedText {
      /* Notice: it starts and ends with the same color (orange) */
      /* background: linear-gradient(90deg, #ff6a25ff, #bd450dff); */
      background: linear-gradient(90deg, #2b6ae0ff, #402be0ff);
      background-size: 300% 100%; /* must be >100% for smooth travel */

      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      /* Linear timing + loop */
      /* animation: gradientMove 6s linear infinite; */
    }
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 15px;
    font-weight: 500;
    color: #6b7280;
  }

  .btn-group {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;

    .primary {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      border: 2px solid #000;
      border-radius: 50px;
      padding: 20px 5px;
      font-size: 1rem;
      font-weight: 800;
      background: #fff;
      cursor: pointer;
      transition: 0.2s;
      width: 100%;
      box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.05);

      border: none;
      color: #fff;

      background: linear-gradient(350deg, #2242b6ff, #47aaf5);
      box-shadow: 2px 6px 20px 3px #4ba0ff;
      transition: all 0.25s ease-in-out;
      filter: brightness(1);

      &:hover {
        transform: scale(1.05);
        filter: brightness(1.2);
        /* background: linear-gradient(350deg, #1e3ca9ff, #6cbfffff); */
      }

      svg {
        font-size: 1.3rem;
      }
    }

    .secondary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      border: 2px solid #000;
      border-radius: 50px;
      padding: 20px 5px;
      font-size: 1rem;
      font-weight: 800;
      background: #fff;
      cursor: pointer;
      transition: 0.2s;
      width: 100%;
      box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.05);

      &:hover {
        transform: scale(1.05);
        /* background: #f2f2f2ff; */
      }

      svg {
        font-size: 1.3rem;
      }
    }

    button {
    }
  }

  @media (min-width: 900px) {
    position: absolute;
    flex-direction: column;
    /* text-align: center; */
    /* justify-content: center; */
    /* align-items: center; */
    gap: 20px;
    /* margin-top: -100px; */

    h1 {
      width: 50vw;
      font-size: 50px;
      font-weight: 800;
      /* text-align: center; */

      /* justify-content: center; */
      /* align-items: center; */
    }

    p {
      font-size: 18px;
      font-weight: 500;
    }

    .btn-group {
      margin-top: 30px;
      flex-direction: row;
      /* justify-content: center; */
      /* align-items: center; */

      .primary {
        width: 300px;
      }

      .secondary {
        width: 300px;
      }

      button {
        width: 300px;
      }
    }
  }
`;

const Dragonfly = styled.img`
  position: absolute;
  width: 100px;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 80px;

  @media (min-width: 1024px) {
    margin-top: 70px;
  }
`;

/* Info Section */
const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin: 0 0;

  .infoBox {
    border: 1px solid #99999943;
    /* background-color: #6a75ee40; */
    padding: 25px;
    /* max-width: 80vw; */
    margin: auto;
    width: 100%;
    display: flex;
    border-radius: 10px;
    flex-direction: row;
    gap: 15px;
    /* width: 200px; */

    img {
      height: 40px;
      /* margin-bottom: 0.5rem; */
    }

    h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
    }

    p {
      margin: 0;
      padding: 0;
      margin-top: 5px;
      font-size: 0.9rem;
      font-weight: 500;
      line-height: 20px;
      /* width: 80%; */
      color: #4b5563;
    }
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    .infoBox {
      max-width: 22.5vw;
      text-align: left;
      margin: 0;
    }
  }

  @media (max-width: 900px) {
    gap: 20px;
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

export default function LandingPage() {
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);

  if (googleLoginLoading)
    return (
      <PageWrapper>
        <LoadingSection />
      </PageWrapper>
    );

  return (
    <PageWrapper>
      {/* Navbar */}

      <ShortWidth>
        <Navbar>
          {/* <img className="logo" src="/logo/full-logo.svg" alt="Render Bruv Logo" /> */}
          {/* <img
            className="liquidStyle"
            src="/logo/liquid-style.png"
            alt="Render Bruv Logo"
          /> */}

          {/* <img
            className="fullLogov2"
            src="/logo/full-logov2.png"
            alt="Render Bruv Logo"
          /> */}

          <img
            className="fullLogo2d"
            src="/logo/2d-full-logo.svg"
            alt="Render Bruv Logo"
          />

          {/* 
          <img
            className="fullLogov2"
            src="/logo/full-logov2.png"
            alt="Render Bruv Logo"
          /> */}

          {/* <BrandContainerThemed /> */}

          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>FAQ</li>
          </ul>
        </Navbar>

        <MobileLogo src="/logo/2d-full-logo.svg" alt="Render Bruv Logo" />

        <Hero>
          <CenterContent>
            <h1>
              Lightning Fast
              <br /> Render Farm For{" "}
              <span className="highlightedText">Blender</span>
            </h1>
            <p>Fast, Affordable & Intuitive</p>

            <div className="btn-group">
              <button
                className="primary"
                onClick={() => {
                  loginWithGoogle(setGoogleLoginLoading);
                }}
              >
                <FaGoogle /> Continue With Google
              </button>
              <button className="secondary" onClick={goTo("/auth")}>
                <SiMaildotru />
                Continue With Email
              </button>
            </div>
          </CenterContent>

          <Illustration>
            {/* <img className="theGif" src="/hero-section/sci-fi3.gif" alt="Gif" /> */}
            {/* <img className="theGif" src="/hero-section/sci-fi6.gif" alt="Gif" /> */}
            {/* <img
              className="theGif"
              src="/hero-section/sci-fi13.gif"
              alt="Gif"
            /> */}
            <img
              className="theGif rollingBall"
              src="/hero-section/sci-fi14.gif"
              alt="Gif"
            />
          </Illustration>
        </Hero>

        <Info>
          <CustomLabel>Why choose us?</CustomLabel>
          <InfoSection>
            <div className="infoBox">
              <img src="/vector-graphics/money.jpg" alt="money" />

              <div className="infoText">
                <h3>Billed by the minute</h3>
                <p>
                  Our pricing is transparent and predictable with clear
                  per-minute rates and we offer very affordable services
                </p>
              </div>
            </div>

            <div className="infoBox">
              <img src="/vector-graphics/ui.jpg" alt="Ui" />

              <div className="infoText">
                <h3>Intuitive User Interface</h3>
                <p>
                  Our user interface is simple, intuitive, and easy to navigate
                </p>
              </div>
            </div>

            <div className="infoBox">
              <img src="/vector-graphics/fast.jpg" alt="Fast" />

              <div className="infoText">
                <h3>Fast & Affordable</h3>
                <p>
                  We offer ultra-fast rendering at highly affordable prices,
                  with access to a wide range of GPUs
                </p>
              </div>
            </div>
          </InfoSection>
        </Info>
      </ShortWidth>

      <Footer />
    </PageWrapper>
  );
}

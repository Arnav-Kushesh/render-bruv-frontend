import styled from "styled-components";
import BrandContainer from "../../../brand/BrandContainer.js";
import BrandContainerThemed2d from "../../../brand/BrandContainerThemed2d.js";

let linkVariant = "text";

const TopPart = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 15px;
  width: 90vw;

  @media (max-width: 900px) {
    justify-content: center;
    margin-top: 30px;
    flex-direction: column;
    align-items: center;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  padding: 0px 20px;
  border-radius: 10px;
  padding-left: 40px;
  height: 70px;
  /* background: var(--gradientSurface); */

  @media (max-width: 900px) {
    /* display: none; */
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
    display: none;
  }
`;

const AnimatedHeroImage = styled.img`
  width: 400px;
  margin-right: 100px;
  transform: scaleX(-1);
  /* margin-top: -50px; */
`;

const mainButtonStyle = {
  background: "var(--gradientSurface)",
  color: "#111",
  boxShadow: "rgb(0 0 0 / 14%) red",
};

const btnStyle = {
  color: "var(--accent)",
};

const btnStyle2 = {
  height: "40px",
  background: "var(--accent)",
  color: "#111",
};

export default function LoggedOutHeader() {
  return (
    <TopPart>
      <BrandContainerThemed2d />
    </TopPart>
  );
}

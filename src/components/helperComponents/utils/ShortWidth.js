import styled from "styled-components";

const ShortWidth = styled.div`
  width: 70vw;
  margin-top: 10px;

  @media (max-width: 1500px) {
    width: 85vw;
  }

  @media (max-width: 900px) {
    padding: 25px;
    margin: 0;
    /* padding-right: 15px; */
    width: 100vw;
  }
`;

export default ShortWidth;

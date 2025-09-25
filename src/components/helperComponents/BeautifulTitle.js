import { AiOutlineDown } from "react-icons/ai";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0px;
  align-items: center;
  position: relative;
  border-radius: 0;
  /* cursor: pointer; */

  font-size: 19px;
  color: var(--element);
  width: auto;
  border-radius: 100px;
  border: 1px solid var(--primaryColor);
  background: var(--glassGradientHard);
  margin-bottom: 0px;
  box-shadow: var(--lightShadow);
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  align-items: center;
  position: relative;
  border-radius: 0;
  /* cursor: pointer; */
  padding: 13px 30px;
  font-size: 19px;
  color: var(--element);
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 17px;
  text-align: left;
  justify-content: flex-start;
  /* opacity: 0.8; */
  position: relative;
  white-space: nowrap;
`;

export default function BeautifulTitle({ children, icon }) {
  return (
    <Container>
      <Main>
        <Icon>{icon}</Icon>
        <Text>{children}</Text>
      </Main>
    </Container>
  );
}

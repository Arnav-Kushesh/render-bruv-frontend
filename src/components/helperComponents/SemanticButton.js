import styled from "styled-components";
import goTo from "../../controllers/goTo";

const User = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--surface2);
  border-radius: 100px;
  gap: 10px;
  padding: 0 20px;
  overflow: hidden;
  height: 45px;

  cursor: pointer;

  opacity: 0.5;
  font-size: 15px;
  text-transform: capitalize;

  &:hover {
    background-color: var(--surface);
  }

  @media (max-width: 900px) {
    font-size: 10px;
    height: 25px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* margin: 50px 0; */
  justify-content: space-between;
  /* gap: 15px; */
  font-size: 18px;
  align-items: center;
`;
const Anchor = styled.a`
  text-decoration: none;
  color: #fff;
`;

export default function SemanticButton({ onClick, href, children, style }) {
  return (
    <Anchor
      href={href}
      onClick={(e) => {
        e.preventDefault();

        if (!onClick) {
          return goTo(href)();
        }

        onClick(e);
        return false;
      }}
    >
      {children}
    </Anchor>
  );
}

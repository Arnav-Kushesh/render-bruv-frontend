import styled from "styled-components";
import Link from "../../helperComponents/Link.js";

const Div = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 25px;
  display: flex;
  gap: 19px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  opacity: 0.8;
  filter: saturate(0.5);
  animation: all 0.6s ease-in;
  color: var(--accent);
  padding: 20px 0;

  ${({ isSelected }) => {
    if (isSelected) {
      return `
      opacity:1;
      filter: saturate(1);
      `;
    }
  }}
`;

const Icon = styled.img`
  height: 25px;
  width: auto;
  object-fit: contain;
  object-fit: contain;
  /* margin-right: 10px; */
`;

const Text = styled.div`
  font-size: 16.5px;
  font-weight: 700;
`;

export default function LoggedInHeaderButton({ link, icon, text }) {
  let isSelected = checkIsSelected();

  return (
    <Link href={link}>
      <Div isSelected={isSelected}>
        <Icon src={icon} />

        <Text>{text}</Text>
      </Div>
    </Link>
  );

  function checkIsSelected() {
    let current = window.location.pathname;

    if (link == "/") {
      if (current == "/") return true;

      return false;
    }

    if (current.indexOf(link) !== -1) return true;

    return false;
  }
}

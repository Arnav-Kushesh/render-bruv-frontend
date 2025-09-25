import { styled } from "styled-components";
import goTo from "../../controllers/goTo";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: var(--element);
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
  }
`;
const Name = styled.div`
  font-size: 17px;
  font-weight: 600;
`;
const Btn = styled.div`
  padding: 11px 18px;
  font-size: 17px;
  border-radius: 0;
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  /* height: 50px; */
  color: var(--accent);

  ${({ $variant }) => {
    if ($variant === "fluid")
      return `
      border-radius:10px;

    `;
  }}

  ${({ $isActive }) => {
    if ($isActive)
      return `
        background:var(--accent) !important;
        color:var(--mainBackground) !important;
    `;

    return `
    &:hover {
      background: var(--surface2) !important;
    }
    
    `;
  }}

${({ $isActive, $disableInActive }) => {
    if (!$isActive && $disableInActive)
      return `
        opacity:0.5;
       
    `;
  }}
`;
const Toggle = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  /* height: 50px; */
  /* background: var(--surface2); */
  overflow: hidden;
  /* width: 100%; */
  gap: 10px;
  padding: 5px;
  flex-wrap: wrap;

  background: var(--surface2);
  border: 1px solid var(--glassBorder);
  box-shadow: var(--hardShadow);

  ${({ variant }) => {
    if (variant === "fluid")
      return `
      overflow: unset;
      flex-wrap:wrap;
      gap:10px;
    `;
  }}
`;

const ButtonLabel = styled.div`
  font-weight: 700;
`;
export default function CustomToggle({
  variant,
  name,
  value,
  onChange,
  options,
  style,
  toggleStyle,
  btnStyle,
  disableInActive,
  btnPrefix,
  isLinkBased,
}) {
  if (isLinkBased) {
    value = window.location.pathname;
    onChange = (newLink) => {
      goTo(newLink)();
    };
  }

  if (!options) {
    if (!value) value = false;

    options = [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ];
  }

  let PrefixComp = btnPrefix;

  let tgl = (
    <Toggle variant={variant} style={toggleStyle}>
      {options.map((item) => (
        <Btn
          $disableInActive={disableInActive}
          $variant={variant}
          style={btnStyle}
          key={item.value}
          onClick={() => {
            onChange(item.value);
          }}
          $isActive={item.value === value}
        >
          {PrefixComp ? <PrefixComp config={item} /> : null}
          <ButtonLabel>{item.label}</ButtonLabel>
        </Btn>
      ))}
    </Toggle>
  );

  if (!name) return tgl;

  return (
    <Container style={style}>
      {name ? <Name>{name}</Name> : null}

      {tgl}
    </Container>
  );
}

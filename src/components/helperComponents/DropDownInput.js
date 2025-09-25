import { styled } from "styled-components";
import { useContext } from "react";
import Context from "../../Context.js";
import { AiOutlineDown } from "react-icons/ai";
import PopupSelect from "./PopupSelect.js";
import goTo from "../../controllers/goTo.js";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  /* width: 100%; */
  background: var(--surface2);
  border: 1px solid var(--border);
  box-shadow: var(--lightShadow);

  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  gap: 25px;
`;

const Label = styled.div`
  width: 100%;
  opacity: 1;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 600;
  /* opacity: 0.7; */
  text-transform: capitalize;
  color: var(--elementDim);
`;

const Left = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const SelectInputText = styled.div`
  font-size: 12px;
  white-space: nowrap;
  font-weight: 600;
  color: var(--element);
`;
const SelectInputButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3px;
  color: var(--element);
`;

export default function DropDownInput({
  value,
  placeholder,
  onChange,
  options = [],
  label,
  style,
  popupComponent,
  isLinkBased,
  disableSearch,
}) {
  options = [...options];
  const { setForm } = useContext(Context);

  if (!placeholder) placeholder = "Select";

  if (isLinkBased) {
    value = window.location.pathname;
    onChange = (newVal) => {
      console.log("input------", newVal);
      goTo(newVal, { isReplace: true })();
    };
  }
  let valToShow = getLabelFromValue({ value, options });

  if (!valToShow && value) valToShow = value;

  let placeholderData = valToShow ? valToShow : placeholder;

  return (
    <Container
      style={style}
      onClick={() => {
        setForm({
          title: placeholder,
          component: popupComponent ? (
            popupComponent
          ) : (
            <PopupSelect
              disableSearch={disableSearch}
              isLinkBased={isLinkBased}
              value={value}
              options={options}
              onChange={(newVal) => {
                onChange(newVal);
              }}
            />
          ),
        });
      }}
    >
      <Left>
        {label ? <Label>{label}</Label> : null}

        {placeholderData ? (
          <SelectInputText>{placeholderData}</SelectInputText>
        ) : null}
      </Left>
      <SelectInputButton>
        <AiOutlineDown />
      </SelectInputButton>
    </Container>
  );
}

function getLabelFromValue({ value, options }) {
  if (!options) return ""; // In case of location input

  for (let item of options) {
    if (item.value == value) return item.label;
  }

  return false;
}

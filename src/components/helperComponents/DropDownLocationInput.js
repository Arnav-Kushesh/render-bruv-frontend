import { styled } from "styled-components";
import { useContext } from "react";
import Context from "../../Context.js";
import { AiOutlineDown } from "react-icons/ai";
import PopupLocationSelector from "./PopupLocationSelector.js";
import DropDownInput from "./DropDownInput.js";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 100%;
  background-color: var(--glassBorder);
  border: 1px solid var(--borderDim);
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
`;

const Label = styled.div`
  width: 100%;
  opacity: 1;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
`;

const Left = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const SelectInputText = styled.div`
  font-size: 15px;
  font-weight: 500;
`;
const SelectInputButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export default function DropDownLocationInput(props) {
  const { setForm } = useContext(Context);

  let { value, onChange, type, country, state } = props;

  return (
    <DropDownInput
      {...props}
      label={type.toLowerCase()}
      popupComponent={
        <PopupLocationSelector
          state={state}
          country={country}
          type={type}
          value={value}
          onChange={onChange}
        />
      }
    />
  );
}

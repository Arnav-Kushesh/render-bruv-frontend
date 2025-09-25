import styled from "styled-components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai/index.js";
import { useState } from "react";

const Input = styled.input`
  border: none;
  width: 100%;
  text-align: left;
  padding: 15px 0;
  border: none;
  font-size: 15px;

  background: transparent;
  /* font-weight: 800; */

  outline: none;
  color: var(--element);
  flex: 1;
`;

const Container = styled.div`
  background: var(--surface2);
  border-radius: 10px;
  padding: 0px 25px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const ShowButton = styled.div`
  cursor: pointer;
  padding: 15px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.25s ease-in-out;

  &:hover {
    transform: scale(0.95);
  }
`;

function CustomInput({ onChange, onSubmit, type, value, placeholder }) {
  const [showVal, setShowVal] = useState(false);

  return (
    <Container>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={showVal ? "" : type}
        onKeyUp={checkSubmit}
      />

      {type == "password" ? (
        <ShowButton
          onClick={() => {
            setShowVal(!showVal);
          }}
        >
          {showVal ? <AiFillEyeInvisible /> : <AiFillEye />}
        </ShowButton>
      ) : null}
    </Container>
  );

  function checkSubmit(e) {
    if (e.keyCode === 13) {
      onSubmit();
    }
  }
}

export default CustomInput;

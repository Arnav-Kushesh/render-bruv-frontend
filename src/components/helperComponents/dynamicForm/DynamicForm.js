import styled, { keyframes } from "styled-components";
import { useContext, useState } from "react";
import { MdDone } from "react-icons/md/index.js";
import BarLoader from "../BarLoader.js";
import BackButton from "../BackButton.js";
import Input from "../Input.js";
import capitalizeFirstLetter from "../../../controllers/capitalizeFirstLetter.js";
import InfoButton from "./InfoButton.js";
import Context from "../../../Context.js";
import getUrlParams from "../../../controllers/getUrlParams.js";

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  color: var(--element);
  border-top: 1px solid var(--borderDim);
  background: transparent;
  text-transform: capitalize;
  border-radius: 0;
  font-weight: 950;
  padding: 20px;

  &:hover {
    background: var(--surface2);
  }
`;

const Option = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  color: var(--element);
  border-top: 1px solid var(--primaryColor);
  background: transparent;
  text-transform: capitalize;
  font-weight: 600;
  border-radius: 0;
  font-weight: 950;
  padding: 20px;

  background: var(--gradientSurface);

  &:hover {
    background: var(--accent);
    color: var(--mainBackground);
  }
`;

const FormHeader = styled.div`
  display: flex;
  flex-direction: row;
  opacity: 0.7;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 0;
`;

const DoneButton = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 500px;
  background-color: var(--surface2);
  cursor: pointer;
  &:hover {
    background-color: var(--element);
    color: var(--mainBackground);
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 25px;
  flex-direction: column;
  gap: 0;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 1px solid var(--borderDim);
  padding: 20px;
  gap: 15px;
  color: var(--surface2);
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Padding = styled.div`
  padding: 20px;
`;

const Container = styled.div`
  left: 0;
  top: 0;
  border-radius: 0 0 10px 10px;
  width: 100vw;
  position: absolute;
  z-index: 3500;
  display: flex;
  flex-direction: column;

  max-height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  background: var(--mainBackground);
  border: 1px solid var(--border);

  box-shadow: 1px 1px 20px 20px var(--accent);
  animation: centerScaleReveal 0.25s ease-in-out;
  box-shadow: var(--lightShadow);
  backdrop-filter: blur(10px);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border: 1px solid black;
  }

  @media (max-width: 900px) {
    /* border: none; */
  }

  @media (min-width: 900px) {
    left: 30.5vw;
    top: 25px;
    border-radius: 10px;
    width: 39vw;
    max-height: 90vh;
  }

  ${({ height }) => {
    if (height)
      return `
        height: ${height} !important;
      `;
  }}

  ${({ width }) => {
    if (width)
      return `
        width: ${width} !important;
        left: calc((100vw - ${width})/2) !important;
      `;
  }}
`;

const MainContainer = styled.div`
  position: fixed;
  top: var(--safe-area-inset-top);
  left: 0;
  height: 100dvh;
  width: 100vw;
  z-index: 1000;
  overflow: hidden;
`;

const InfoButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "rgba(0,0,0,0.6)"};
  z-index: 1500;
  height: 100dvh;
  backdrop-filter: blur(15px);
  width: 100vw;
  opacity: 1;
  display: block;
  animation: fadeIn 0.2s ease-in;
`;

const ButtonIcon = styled.div`
  margin-right: ${({ gap }) => (gap ? gap : "7px")};
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

function DynamicForm({ setForm, data, background }) {
  const { currentRoute } = useContext(Context);
  let params = getUrlParams(currentRoute);

  let [allValues, setValues] = useState({});

  if (!params.get("formPage")) return null;

  if (!data) return [];
  let formData = data.data;
  if (!formData) return [];
  if (!formData.settings) formData.settings = {};
  let { height, width } = formData.settings;

  if (!formData.inputs) formData.inputs = [];
  if (!formData.buttons) formData.buttons = [];
  if (!formData.component) formData.component = null;
  if (!formData.informativeButtons) formData.informativeButtons = [];

  let inputWidgets = [];
  let buttonWidgets = [];
  let optionsWidgets = [];
  let iconWidgets = [];
  let informativeButtonWidgets = [];

  processElements("input", formData.inputs);
  processElements("button", formData.buttons);
  processElements("option", formData.options);
  processElements("informativeButton", formData.informativeButtons);
  processElements("icon", formData.icons);

  let sections = [];

  let header = null;
  if (formData.title)
    header = (
      <FormHeader key="title">
        <BackButton
          onClick={() => {
            closeButton();
          }}
          title={formData.title}
        />

        {formData.onDone ? (
          <DoneButton
            onClick={() => {
              formData.onDone({ values: allValues });
            }}
          >
            <MdDone />
          </DoneButton>
        ) : null}
      </FormHeader>
    );

  if (formData.inputs.length)
    sections.push(<Inputs key="inputs">{inputWidgets}</Inputs>);

  let infoButtons = (
    <InfoButtons key="infoButtons">{informativeButtonWidgets}</InfoButtons>
  );

  let buttons = <Buttons key="buttons">{buttonWidgets}</Buttons>;
  let options = <Options key="options">{optionsWidgets}</Options>;
  let icons = <Icons key="icons">{iconWidgets}</Icons>;

  let mainContent = (
    <>
      {header}
      {sections.length ? <Padding>{sections}</Padding> : null}
      {formData.component ? formData.component : null}
      {informativeButtonWidgets.length ? infoButtons : null}
      {buttonWidgets.length ? buttons : null}
      {optionsWidgets.length ? options : null}
      {iconWidgets.length ? icons : null}
    </>
  );

  return (
    <MainContainer>
      <Container width={width} height={height}>
        {formData.loading ? (
          <Padding>
            <BarLoader height={4} color="#fff" width={"100%"} />
          </Padding>
        ) : (
          mainContent
        )}
      </Container>
      <Background {...background} onClick={closeButton} />
    </MainContainer>
  );

  function inputChanged(name) {
    return (e) => {
      let value = e.target.value;
      let newValues = { ...allValues };
      newValues[name] = value;
      setValues(newValues);
    };
  }

  function buttonClicked(e, callback) {
    let name = e.target.dataset.name;
    callback({ values: allValues, buttonName: name, event: e });
  }

  function processElements(type, elements) {
    if (!elements) return;
    for (let elementData of elements) {
      if (type == "input") {
        let name,
          placeholder = "";

        if (typeof elementData == "string") {
          name = elementData;
          placeholder = elementData;
        } else {
          name = elementData.name;
          if (!elementData.placeholder) elementData.placeholder = name;

          placeholder = elementData.placeholder;
          if (typeof allValues[name] == "undefined")
            if (elementData.value)
              setValues({ ...allValues, [name]: elementData.value });
        }

        let value = allValues[name];
        if (typeof value == "undefined") value = "";

        inputWidgets.push(
          <Input
            type={elementData.type}
            onChange={inputChanged(name)}
            placeholder={capitalizeFirstLetter(placeholder)}
            name={name}
            key={name}
            value={value}
          />
        );
      } else if (type == "informativeButton") {
        informativeButtonWidgets.push(
          <InfoButton
            key={elementData.name}
            name={elementData.name}
            icon={elementData.icon}
            image={elementData.image}
            info={elementData.info}
            onClick={elementData.onClick}
          />
        );
      } else if (type == "button") {
        let icon = null;

        if (elementData.icon) {
          icon = (
            <ButtonIcon key={elementData.name + "-icon"} gap={elementData.gap}>
              {elementData.icon}
            </ButtonIcon>
          );
        }

        buttonWidgets.push(
          <Button
            key={elementData.name}
            onClick={(e) => {
              buttonClicked(e, elementData.onClick);
            }}
            data-name={elementData.name}
          >
            {[icon, elementData.name]}
          </Button>
        );
      } else if (type == "icon") {
        let icon = (
          <ButtonIcon
            key={elementData.name}
            onClick={(e) => {
              buttonClicked(e, elementData.onClick);
            }}
            data-name={elementData.name}
            gap={elementData.gap}
          >
            {elementData.icon}
          </ButtonIcon>
        );

        iconWidgets.push(icon);
      } else if (type == "option") {
        let icon = null;

        if (elementData.icon) {
          icon = (
            <ButtonIcon key={elementData.name + "-icon"} gap={elementData.gap}>
              {elementData.icon}
            </ButtonIcon>
          );
        }

        optionsWidgets.push(
          <Option
            key={elementData.name}
            onClick={(e) => {
              buttonClicked(e, elementData.onClick);
            }}
            data-name={elementData.name}
          >
            {[icon, elementData.name]}
          </Option>
        );
      }
    }
  }

  function closeButton() {
    let settings = formData.settings;
    if (settings) if (settings.disableCloseButton) return;

    if (data.noPathChange) {
      setForm(null, true);
    } else {
      setForm(null);
    }
  }
}

export default DynamicForm;

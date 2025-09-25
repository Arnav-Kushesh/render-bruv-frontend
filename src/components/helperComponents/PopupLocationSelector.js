import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import LoadingSection from "./LoadingSection.js";
import { serverLine } from "../../controllers/network/serverLine.js";
import PopupSelect from "./PopupSelect.js";

const Container = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
const Searchbox = styled.input`
  padding: 15px 15px;
  background: transparent;
  border: none;
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  color: var(--element);
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Item = styled.div`
  padding: 15px;
  background: var(--surface2);
  border-radius: 10px;

  ${({ highlight }) => {
    if (highlight)
      return `
        color: var(--mainBackground);
        background: var(--element);
    `;
  }}
`;

const Error = styled.div`
  padding: 25px;
  color: tomato;
`;

export default function PopupLocationSelector({
  value,
  onChange,
  type,
  country,
  state,
}) {
  const [options, setOptions] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type == "COUNTRY") {
      serverLine.get("/countries").then(setOptions);
    } else if (type === "STATE") {
      if (!country) {
        setError("Please Select Country First");
      } else {
        serverLine.get("/states/?country=" + country).then(setOptions);
      }
    } else if (type === "CITY") {
      if (!state || !country) {
        setError("Please Select Country and State First");
      } else {
        serverLine
          .get(`/cities/?country=${country}&state=${state}`)
          .then(setOptions);
      }
    }
  }, []);

  if (error) return <Error>{error}</Error>;
  if (!options) return <LoadingSection />;

  // return JSON.stringify(options);

  return <PopupSelect value={value} options={options} onChange={onChange} />;
}

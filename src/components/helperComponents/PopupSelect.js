import { useState } from "react";
import { styled } from "styled-components";
import MaterialInput from "./MaterialInput.js";
import goTo from "../../controllers/goTo.js";

const Container = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
`;

const Item = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: var(--element);
  background: var(--surface2);
  border: 1px solid var(--border);
  box-shadow: var(--lightShadow);
  font-weight: 700;
  border-radius: 10px;

  &:hover {
    background: var(--accent);
    color: var(--mainBackground);
  }

  ${({ $isActive }) => {
    if ($isActive)
      return `
        background: var(--element);
        color: var(--elementAlt);
    `;
  }}
`;

export default function PopupSelect({
  value,
  options,
  onChange,
  isLinkBased,
  disableSearch,
}) {
  const [query, setQuery] = useState("");

  return (
    <Container>
      {disableSearch ? null : (
        <MaterialInput
          autoFocus={true}
          onChange={({ target }) => {
            setQuery(target.value);
          }}
          label={"Type here to search"}
        />
      )}

      <List>
        {renderList()}

        {!isLinkBased && (
          <Item
            key={"Deselect"}
            onClick={() => {
              goTo(-1)();
              onChange(null);
            }}
          >
            De-select
          </Item>
        )}
      </List>
    </Container>
  );

  function renderList() {
    let items = [];

    for (let item of options) {
      if (query) {
        let theQuery = query;
        theQuery = theQuery.toString();
        let toMatch = item.label.toString().toLowerCase();
        if (toMatch.indexOf(theQuery.toLowerCase()) === -1) {
          continue;
        }
      }
      items.push(
        <Item
          key={item.value}
          $isActive={value == item.value}
          onClick={() => {
            if (!isLinkBased) goTo(-1)();
            onChange(item.value);
          }}
        >
          {item.label}
        </Item>
      );
    }

    return items;
  }
}

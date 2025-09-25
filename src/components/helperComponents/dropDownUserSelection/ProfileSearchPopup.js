import { useState } from "react";
import styled from "styled-components";
import MaterialInput from "../MaterialInput";
import ProfileAggregator from "../../applicationUI/aggregator/ProfileAggregator";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  align-items: center;
  width: 100%;
`;

const Row2Section = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
`;

const DataColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  gap: 30px;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export default function ProfileSearchPopup({ onChange }) {
  const [tmpValue, setTmpValue] = useState(null);
  const [inheritedSearchQuery, setInheritedSearchQuery] = useState(null);

  return (
    <Center>
      <Container>
        <SearchContainer>
          <MaterialInput
            label={"Search"}
            value={tmpValue}
            onEnter={(e) => {
              setInheritedSearchQuery(e.target.value);
            }}
            onChange={(e) => {
              setTmpValue(e.target.value);
            }}
          />
        </SearchContainer>

        <ProfileAggregator
          onCardClick={onChange}
          columns={1}
          inheritedSearchQuery={inheritedSearchQuery}
          hideTitleSection={true}
        />
      </Container>
    </Center>
  );
}

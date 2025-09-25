import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import ProfileFeedItem from "../../profilePage/ProfileFeedItem";
import { serverLine } from "../../../controllers/serverLine";

import MaterialInput from "../../helperComponents/MaterialInput";
import CustomToggle from "../../helperComponents/CustomToggle";
import Context from "../../../Context";

import LoadingSection from "../../helperComponents/LoadingSection";
import ArticleCard from "../../cardForProfile/ArticleCard";
import InfoBox from "../../utils/InfoBox";
import DropDownInput from "../../helperComponents/DropDownInput";
import ContentFeed from "../../feed/ContentFeed";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 0;
  gap: 50px;
  width: 100%;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    width: 90vw;
  }
`;

const Title = styled.div`
  text-transform: capitalize;
  font-size: 21px;
  background-color: var(--surface2);
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 300;
  flex-direction: row;
  align-items: center;
  display: flex;
  opacity: 0.7;
  gap: 10px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const LocationFilter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: space-between;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 45vw;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

let typeOptions = [
  { label: "Books", value: "BOOK" },
  { label: "Articles", value: "ARTICLE" },
  { label: "Users", value: "USER" },
];

export default function Search() {
  const [type, setType] = useState("BOOK");

  const [searchQuery, setSearchQuery] = useState("");
  const [tmpQuery, setTmpQuery] = useState("");

  return (
    <Container>
      <Top>
        <MaterialInput
          label={"Search"}
          value={tmpQuery}
          onEnter={updateSearchQuery}
          onChange={updateSearchQueryTmp}
        />

        <CustomToggle value={type} onChange={setType} options={typeOptions} />
      </Top>

      {searchQuery ? (
        <ContentFeed
          type={type}
          filterType={"SEARCH"}
          title={""}
          feedType={"INFINITE"}
          searchQuery={searchQuery}
        />
      ) : (
        <InfoBox>Type and press enter to begin search</InfoBox>
      )}
    </Container>
  );

  function updateSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function updateSearchQueryTmp(e) {
    setTmpQuery(e.target.value);
  }
}

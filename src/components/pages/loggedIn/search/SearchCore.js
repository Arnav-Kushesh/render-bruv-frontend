import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { serverLine } from "../../../controllers/serverLine";
import MaterialInput from "../../../helperComponents/MaterialInput";
import CustomToggle from "../../../helperComponents/CustomToggle";
import LoadingSection from "../../../helperComponents/LoadingSection";
import SearchSortBy from "../../search/SearchSortBy";
import SearchPagination from "./SearchPagination";
import ArticleCard from "../cardForProfile/ArticleCard";
import BookCard from "../cardForProfile/BookCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 0;

  width: 100%;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 38vw;
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

let typeOptions = [
  { label: "Users", value: "PROFILE" },
  { label: "Content", value: "CONTENT" },
];

const FilterRow = styled.div``;

export default function SearchCore() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [type, setType] = useState("PROFILE");
  const [sortBy, setSortBy] = useState("RELEVANCE");
  const [pagination, setPagination] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    doQuery();
  }, [type]);

  async function doQuery() {
    if (searchQuery) {
      setLoading(true);
      setList([]);
      let res = await serverLine.get(
        `/search/?&type=${type}&query=${searchQuery}&pagination=${pagination}&sortBy=${sortBy}`
      );

      setList(res);
      setLoading(false);
    }
  }

  if (loading)
    return (
      <Container>
        <LoadingSection />
      </Container>
    );

  let items = [];

  items = list.map((item) => <BookCard item={item} />);

  let content = <List>{items}</List>;

  if (!list.length) content = <Title>Nothing found</Title>;

  return (
    <Container>
      <Main>
        <MaterialInput
          label={"Search"}
          value={searchQuery}
          onEnter={doQuery}
          onChange={updateSearchQuery}
        />
        <CustomToggle
          value={type}
          onChange={changeType}
          options={typeOptions}
        />
        <FilterRow>
          <SearchSortBy type={type} value={sortBy} onChange={updateSortBy} />
          <SearchPagination value={pagination} onChange={updatePagination} />
        </FilterRow>
        {content}
      </Main>
    </Container>
  );

  function updateSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function updateSortBy(newSortBy) {
    setPagination(0);
    setSortBy(newSortBy);
    doQuery();
  }

  function updatePagination(newPageNum) {
    setPagination(newPageNum);
    doQuery();
  }

  function changeType(newType) {
    setSortBy(null);
    setPagination(0);
    setType(newType);
    doQuery();
  }
}

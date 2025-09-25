import { useContext, useEffect, useState } from "react";
import LoggedInBoilerplate from "./LoggedInBoilerplate";
import LoadingSection from "../../helperComponents/LoadingSection";
import styled from "styled-components";
import CustomMasonry from "../../helperComponents/CustomMasonry";
import Context from "../../../Context";
import LoggedOutBoilerplate from "../loggedOut/LoggedOutBoilerplate";
import TitleBar from "../../helperComponents/TitleBar";
import fetchDataWithCaching from "../../../controllers/network/fetchDataWithCaching";
import PullToRefresh from "react-simple-pull-to-refresh";

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const TopLeft = styled.div`
  font-size: 27px;
  color: var(--accent);
  font-size: 18px;
  font-weight: 900;
  font-family: "Montserrat", sans-serif;
  color: #c9d400;
  margin: 0;

  @media (max-width: 900px) {
    font-size: 17px;
    display: none;
  }
`;

const TopRight = styled.div`
  /* height: 50px; */
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 90vw;
  min-height: 90vh;

  @media (max-width: 900px) {
    gap: 20px;

    margin-top: 0;
  }
`;

export default function ListPage({
  path,
  CardComponent,
  title,
  filterData,
  filterComponent,
  colsOnMobile = 1,
  filterFunction,
  onlyRenderContent,
}) {
  const { loggedInUserId } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [items_, setItems] = useState(null);

  let items = items_;

  if (filterData) {
    items = filterData(items_);
  }

  useEffect(() => {
    loadData(false);
  }, [path]);

  async function loadData(skipCache) {
    let data = await fetchDataWithCaching({
      path,
      skipCache,
      setLoading,
      onFreshData: setItems,
    });
    setItems(data);
    setLoading(false);
  }

  async function handleRefresh() {
    await loadData(true);
  }

  let MainContainer = LoggedInBoilerplate;

  if (!loggedInUserId) MainContainer = LoggedOutBoilerplate;

  let titleBar = <TitleBar onlyMobile={true}>{title}</TitleBar>;

  if (onlyRenderContent) titleBar = null;

  if (loading)
    return (
      <MainContainer onlyRenderContent={onlyRenderContent}>
        {titleBar}
        <LoadingSection />
      </MainContainer>
    );

  if (!items) return null;

  let filteredItems = items;

  if (filterFunction) {
    filteredItems = filterFunction(filteredItems);
  }

  let allItems = filteredItems.map((item) => <CardComponent item={item} />);

  let masonryComponent = (
    <CustomMasonry
      gap="25px"
      mobileGap="20px"
      list={allItems}
      maxCol={4}
      colsOnMobile={colsOnMobile}
    />
  );

  if (onlyRenderContent) return masonryComponent;

  return (
    <MainContainer>
      {titleBar}

      <PullToRefresh onRefresh={handleRefresh}>
        <Container>
          <Top>
            <TopLeft>{title}</TopLeft>
            {filterComponent ? <TopRight>{filterComponent}</TopRight> : null}
          </Top>

          {masonryComponent}
        </Container>
      </PullToRefresh>
    </MainContainer>
  );
}

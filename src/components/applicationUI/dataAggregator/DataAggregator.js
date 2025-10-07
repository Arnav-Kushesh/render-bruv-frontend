import styled from "styled-components";
import { useContext, useEffect, useMemo, useState } from "react";
import { BiFilter, BiReset } from "react-icons/bi";
import CustomLabelDim from "../customLabel/CustomLabelDim";
import MaterialInput from "../../helperComponents/MaterialInput";
import CustomLabel from "../customLabel/CustomLabel";
import Context from "../../../Context";
import CustomButton from "../../helperComponents/CustomButton";
import { serverLine } from "../../../controllers/network/serverLine";
import CustomPagination from "../../helperComponents/CustomPagination";
import CustomMasonry from "../../helperComponents/CustomMasonry";
import LoadingSection from "../../helperComponents/LoadingSection";
import ListSizeSetter from "../../helperComponents/ListSizeSetter";
import { GrClose } from "react-icons/gr";
import DataAggregatorTableView from "./DataAggregatorTableView";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  width: 100%;
  /* margin-top: 30px; */
  /* padding: 20px; */
  /* border-radius: 10px; */
  /* border: 1px solid var(--borderDim); */
  /* background: var(--surface2); */

  @media (max-width: 900px) {
    padding: 0;
    border: none;
    gap: 15px;
    background: transparent;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 25px;

  @media (max-width: 900px) {
    margin: 0;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  transition: 0.25s ease-in-out;
  flex-wrap: wrap;
  overflow: hidden;
  max-height: 500px;
  width: 100%;
  padding-bottom: 20px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SearchContainer = styled.div`
  width: 300px;
`;

const Content = styled.div`
  /* 
  padding: 15px;
  border: 1px solid var(--borderDim);
  background: var(--surface2); 
  */
  //
  //
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  min-height: 500px;
  animation: centerScaleReveal 0.4s ease-in-out forwards;
`;

const BottomPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;

  ${({ $columns }) => {
    if ($columns == 1) {
      return `
       flex-direction: column-reverse;
        gap: 15px;
        `;
    }
  }}

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 5px;
  }
`;

export default function DataAggregator({
  columns = 1,
  userId,
  CardComponent,
  path,
  doReset,
  queryParams,
  filters,
  title,
  nothingFoundMessage,
  disableFilters,
  inheritedSearchQuery,
  callback,
  onCardClick,
  buttons,
  hideTitleSection,
  showReportedItems,
  overrideCardStyle,
  disableSearch,
  tableViewSettings,
  viewMode,
}) {
  const { isMobile } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tmpSearch, setTmpSearch] = useState("");
  const [entireResponse, setEntireResponse] = useState({});
  const [searchQuery, setSearchQuery] = useState(null);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [showFilter, setShowFilters] = useState(false);

  const queryParamsMemo = useMemo(
    () => ({
      ...queryParams,
    }),
    [queryParams]
  );

  useEffect(() => {
    setCurrentPage(0);
    doQuery(0);
  }, [itemsPerPage, queryParamsMemo, searchQuery, inheritedSearchQuery]);

  if (!nothingFoundMessage) nothingFoundMessage = "Empty"; //This list is empty

  if (viewMode !== "TABLE") tableViewSettings = null;

  let core = null;

  if (loading) {
    core = <LoadingSection />;
  } else {
    core = (
      <CustomMasonry
        gap="10px"
        list={items.map((item) => (
          <CardComponent
            overrideCardStyle={overrideCardStyle}
            forReportPurposes={showReportedItems ? true : false}
            onCardClick={onCardClick}
            callback={callback}
            entireResponse={entireResponse}
            key={item._id}
            data={item}
          />
        ))}
        maxCol={columns}
        minCol={columns}
      />
    );

    if (!items.length) {
      core = <CustomLabelDim>{nothingFoundMessage}</CustomLabelDim>;
    }

    if (tableViewSettings) {
      core = (
        <DataAggregatorTableView
          fields={tableViewSettings.columns}
          items={items}
        />
      );
    }
  }

  let activateFilterToggle = false;

  if (isMobile) activateFilterToggle = true;

  activateFilterToggle = true;

  let filterCompStyle = {};

  if (!showFilter && activateFilterToggle) {
    filterCompStyle.maxHeight = 0;
    filterCompStyle.maxWidth = 0;
    filterCompStyle.paddingBottom = 0;
  }

  let filterComp = (
    <Filters style={filterCompStyle}>
      {filters}

      {!disableSearch && (
        <SearchContainer>
          <MaterialInput
            label={"Search"}
            value={tmpSearch}
            onEnter={(e) => {
              setSearchQuery(e.target.value);
            }}
            onChange={(e) => {
              setTmpSearch(e.target.value);
            }}
          />
        </SearchContainer>
      )}
    </Filters>
  );

  if (disableFilters) {
    activateFilterToggle = false;
    filterComp = null;
  }

  let topSection = (
    <TopSection>
      {title ? <CustomLabel>{title}</CustomLabel> : null}

      {activateFilterToggle ? (
        <CustomButton
          // style={{ padding: "10px" }}
          iconStyle={{
            fontSize: "20px",
            //  color: "var(--accent)"
          }}
          style={{
            padding: "0",
            // background: "transparent",
            // border: "none",
            height: "32px",
            width: "32px",
            //  color: "var(--accent)",
            // background: "var(--accentSurface)",
            // border: "1px solid var(--accentDim)",
          }}
          onClick={() => {
            setShowFilters(!showFilter);
          }}
          icon={<BiFilter />}
        ></CustomButton>
      ) : null}
    </TopSection>
  );

  if (hideTitleSection) topSection = null;

  let bottomPart = (
    <BottomPart $columns={columns}>
      <ListSizeSetter value={itemsPerPage} onChange={setItemsPerPage} />
      <CustomPagination value={currentPage} max={maxPages} onChange={doQuery} />
    </BottomPart>
  );

  if (!items?.length) bottomPart = null;

  return (
    <Container>
      {topSection}

      {filterComp}

      <Content>{core}</Content>

      {loading ? null : bottomPart}
    </Container>
  );

  function getThePath(newPage) {
    // if (!newPage) newPage = currentPage; this line will cause bug for 0 page

    let more = "";

    let theParams = { ...queryParamsMemo };

    if (showReportedItems) theParams.hasNewReports = true;

    if (userId) theParams.userId = userId;
    if (searchQuery) theParams.searchQuery = searchQuery;
    if (inheritedSearchQuery) theParams.searchQuery = inheritedSearchQuery;

    for (let key in theParams) {
      if (theParams[key]) {
        more = more + `&${key}=${theParams[key]}`;
      }
    }

    let toReturn = `/${path}/?currentPage=${newPage}&itemsPerPage=${itemsPerPage}${more}`;

    return toReturn;
  }

  function doQuery(newPage) {
    let thePath = getThePath(newPage);

    let more = "";
    for (let key in queryParamsMemo) {
      if (queryParamsMemo[key]) {
        more = more + `&${key}=${queryParamsMemo[key]}`;
      }
    }

    setLoading(true);
    setCurrentPage(newPage);
    serverLine.get(thePath).then((newData) => {
      setEntireResponse(newData);
      setLoading(false);
      setItems(newData.list);
      setTotalDocuments(newData.totalDocuments);
      setMaxPages(newData.maxPages);
    });
  }
}

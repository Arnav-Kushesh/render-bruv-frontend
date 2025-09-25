import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import ListSizeSetter from "../helperComponents/ListSizeSetter";
import LoadingSection from "../helperComponents/LoadingSection";
import CustomMasonry from "../helperComponents/CustomMasonry";
import CustomPagination from "../helperComponents/CustomPagination";
import { serverLine } from "../../controllers/network/serverLine";
import CustomButton from "../helperComponents/CustomButton";
import LoggedInBoilerplate from "../pages/loggedIn/LoggedInBoilerplate";
import Context from "../../Context";
import PermissionDeniedPage from "./PermissionDeniedPage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
  margin-top: 30px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const Content = styled.div`
  padding: 15px;
  border: 1px solid var(--borderDim);
  background: var(--surface2);
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  min-height: 500px;
  animation: centerScaleReveal 0.4s ease-in-out forwards;
`;

const BottomPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export default function ListPage({
  CardComponent,
  titleLine1,
  titleLine2,
  path,
  buttons = [],
  queryParams,
  filters,
  permissionName,
}) {
  const { loggedInUser } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(0);
    doQuery(0);
  }, [itemsPerPage, queryParams]);

  if (!loggedInUser.isSuperAdmin) {
    if (!loggedInUser.role) {
      return <PermissionDeniedPage />;
    }

    if (!loggedInUser.role[permissionName]) {
      return <PermissionDeniedPage />;
    }

    if (!loggedInUser.role[permissionName].includes("VIEW")) {
      return <PermissionDeniedPage />;
    }
  }

  let core = null;

  if (loading) {
    core = <LoadingSection />;
  } else {
    core = (
      <>
        <CustomMasonry
          list={items.map((item) => (
            <CardComponent key={item._id} data={item} />
          ))}
          colsOnMobile={1}
          maxCol={2}
          minCol={2}
        />

        <BottomPart>
          <ListSizeSetter value={itemsPerPage} onChange={setItemsPerPage} />
          <CustomPagination
            value={currentPage}
            max={maxPages}
            onChange={doQuery}
          />
        </BottomPart>
      </>
    );
  }

  return (
    <LoggedInBoilerplate titleLine1={titleLine1} titleLine2={titleLine2}>
      <Container>
        {buttons.length || filters ? (
          <Top>
            {buttons.length ? (
              <Buttons>
                {buttons.map((item) => {
                  return (
                    <CustomButton
                      href={item.href}
                      onClick={item.onClick}
                      icon={item.icon}
                    >
                      {item.text}
                    </CustomButton>
                  );
                })}
              </Buttons>
            ) : null}

            <Filters>{filters}</Filters>
          </Top>
        ) : null}

        <Content>{core}</Content>
      </Container>
    </LoggedInBoilerplate>
  );

  function doQuery(newPage) {
    let more = "";
    for (let key in queryParams) {
      if (queryParams[key]) {
        more = more + `&${key}=${queryParams[key]}`;
      }
    }

    setLoading(true);
    setCurrentPage(newPage);
    serverLine
      .get(
        `/${path}/?currentPage=${newPage}&itemsPerPage=${itemsPerPage}${more}`
      )
      .then((newData) => {
        setLoading(false);
        setItems(newData.list);
        setMaxPages(newData.maxPages);
      });
  }
}

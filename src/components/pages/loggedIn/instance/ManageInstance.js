import { useEffect, useState } from "react";
import styled from "styled-components";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import StartRenderingPanel from "./StartRenderingPanel";
import LivePreviewPanel from "./LivePreviewPanel";
import FilesPanel from "./FilesPanel";
import { serverLine } from "../../../../controllers/network/serverLine";
import getSubPath from "../../../../controllers/getSubPath";
import InstanceLastSection from "./InstanceLastSection";
import CustomLabelDim from "../../../applicationUI/CustomLabelDim";
import LoadingSection from "../../../helperComponents/LoadingSection";
import MessageBox from "../../../helperComponents/MessageBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  /* justify-content: space-between; */
  margin-top: 30px;
`;

let placeholderData = { title: "Lotus Scene" };

const Column1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Row1 = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
`;

export default function ManageInstance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  let core = <LoadingSection />;

  if (!loading) {
    if (data)
      if (data.serverInstance.status == "RUNNING") {
        core = (
          <>
            <Row1>
              <StartRenderingPanel />
              <LivePreviewPanel />
            </Row1>

            <FilesPanel />

            <InstanceLastSection
              loadData={loadData}
              itemId={data.serverInstance._id}
            />
          </>
        );
      } else {
        core = (
          <>
            <MessageBox>This instance has been terminated</MessageBox>
          </>
        );
      }
  }

  return (
    <LoggedInBoilerplate>
      <Container>
        {data && (
          <CustomLabelDim style={{ textTransform: "capitalize" }}>
            {data.serverInstance.projectName} (
            {data.serverInstance.status.toLowerCase()})
          </CustomLabelDim>
        )}

        {core}
        {/* <Column1></Column1> */}

        {/* <Column2></Column2> */}
      </Container>
    </LoggedInBoilerplate>
  );

  async function loadData() {
    setLoading(true);

    let itemId = getSubPath(1);
    let newData = await serverLine.get(`/server-instance/?itemId=${itemId}`);
    setData(newData);

    setLoading(false);
  }
}

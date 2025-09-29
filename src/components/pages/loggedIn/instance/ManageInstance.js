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
import generateBaseUrlForInstance from "./controllers/generateBaseUrlForInstance";
import checkServerIsReady from "./controllers/checkServerIsReady";
import CustomLabel from "../../../applicationUI/CustomLabel";
import loadExecutionData from "./controllers/loadExecutionData";
import getSocketConnection from "./controllers/getSocketConnection";
import InstanceCharts from "./InstanceCharts";

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
  const [serverIsReady, setServerIsReady] = useState();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [executionData, setExecutionData] = useState(null);
  const [renderSettings, setRenderSettings] = useState({
    renderType: "ANIMATION",
    engineType: "CYCLES",
    methodType: "CUDA",
    imageFrame: null,
    rangeStart: null,
    rangeEnd: null,
  });

  let baseUrl = data
    ? generateBaseUrlForInstance(data?.serverInstance?.podId)
    : null;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (serverIsReady) {
      let socket = getSocketConnection({
        podId: data?.serverInstance?.podId,
        baseUrl,
      });

      //Whenever the new settings gets saved
      socket.on("data_sync_confirm", (res) => {
        if (res.status === true) {
          refreshExecutionData();
        }
      });
    }
  }, [serverIsReady]);

  useEffect(() => {
    if (data && baseUrl) {
      checkServerIsReady({
        baseUrl,
        serverIsReady,
        setServerIsReady,
        setExecutionData,
      });
    }
  }, [data, serverIsReady, baseUrl]);

  let core = <LoadingSection />;

  if (!loading) {
    if (data) {
      if (data.serverInstance.podId) {
        if (data.serverInstance.status == "RUNNING") {
          if (serverIsReady) {
            core = getServerIsReadyUi();
          } else {
            core = getServerIsInitializingUi();
          }
        } else {
          core = getInstanceHasBeenTerminatedUi();
        }
      } else {
        core = getPodNotAssignedUi();
      }
    }
  }

  return (
    <LoggedInBoilerplate>
      <Container>
        {data && (
          <CustomLabelDim style={{ textTransform: "capitalize" }}>
            {data.serverInstance.projectName}
            {/* {data.serverInstance.status.toLowerCase()}) */}
          </CustomLabelDim>
        )}

        {core}
        {/* <Column1></Column1> */}

        {/* <Column2></Column2> */}
      </Container>
    </LoggedInBoilerplate>
  );

  function getServerIsReadyUi() {
    return (
      <>
        <Row1>
          <StartRenderingPanel
            podId={data?.serverInstance?.podId}
            executionData={executionData}
            baseUrl={baseUrl}
            refreshExecutionData={refreshExecutionData}
            renderSettings={renderSettings}
            setRenderSettings={setRenderSettings}
          />
          <LivePreviewPanel
            podId={data?.serverInstance?.podId}
            baseUrl={baseUrl}
            refreshExecutionData={refreshExecutionData}
          />
        </Row1>

        <FilesPanel />

        <InstanceLastSection
          loadData={loadData}
          itemId={data.serverInstance._id}
        />

        <InstanceCharts podId={data?.serverInstance?.podId} baseUrl={baseUrl} />
      </>
    );
  }

  function getServerIsInitializingUi() {
    return (
      <>
        <MessageBox style={{ height: "100px" }}>
          <LoadingSection />
          <CustomLabel>Please! wait server is being initialized</CustomLabel>
        </MessageBox>
      </>
    );
  }

  function getInstanceHasBeenTerminatedUi() {
    return getServerIsReadyUi();
    return (
      <>
        <MessageBox style={{ height: "100px" }}>
          This instance has been terminated
        </MessageBox>
      </>
    );
  }

  function getPodNotAssignedUi() {
    return (
      <>
        <MessageBox style={{ height: "100px" }}>
          There was an issue creating a server at this time. Please! file an
          issue. We will resolve it as soon as we can.
        </MessageBox>

        <InstanceLastSection
          loadData={loadData}
          itemId={data.serverInstance._id}
        />
      </>
    );
  }

  function refreshExecutionData() {
    loadExecutionData({ baseUrl, setExecutionData });
  }

  async function loadData() {
    setLoading(true);

    let itemId = getSubPath(1);
    let newData = await serverLine.get(`/server-instance/?itemId=${itemId}`);
    setData(newData);

    setLoading(false);
  }
}

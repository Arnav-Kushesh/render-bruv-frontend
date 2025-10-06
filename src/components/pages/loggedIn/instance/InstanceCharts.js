import { useContext, useEffect } from "react";
import styled from "styled-components";
import getSocketConnection from "./controllers/getSocketConnection";
import cpuChart from "./chartsControllers/cpuChart";
import ramChart from "./chartsControllers/ramChart";
import gpuUtilChart from "./chartsControllers/gpuUtilChart";
import gpuMemChart from "./chartsControllers/gpuMemChart";
import networkChart from "./chartsControllers/networkChart";
import Context from "../../../../Context";

const GpuTerminalContainer = styled.div`
  width: 100%;
  background-color: var(--element);
  /* border: 1px solid var(--surface3); */
  border-radius: 10px;

  canvas {
    border-radius: 1rem;
  }
`;

const TerminalTopSection = styled.div`
  width: 100%;
  height: 40vh;
  min-height: 300px;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 80vh;
    min-height: 600px;
  }
`;

const CpuSection = styled.div`
  grid-area: a;
  height: 100%;
  width: 50%;
  min-width: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CpuChartDiv = styled.div`
  height: calc(100% - 1.5rem);
  margin: 1rem 0.5rem 0.5rem 1rem;
  border-radius: 1rem;
  width: calc(100% - 1.5rem);
  background: #212121;

  @media screen and (max-width: 768px) {
    width: calc(100% - 2rem);
    margin: 1rem;
  }
`;

const RamSection = styled.div`
  height: 100%;
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const RamChartDiv = styled.div`
  width: calc(100% - 1.5rem);
  height: calc(100% - 1.5rem);
  margin: 1rem 0.5rem 0 0.5rem;
  background-color: #212121;
  border-radius: 1rem;

  @media screen and (max-width: 768px) {
    width: calc(100% - 2rem);
    height: calc(100% - 1rem);
    margin: 0.5rem 1rem;
    overflow: hidden;
  }
`;

const TerminalMidSection = styled.div`
  width: 100%;
  height: 40vh;
  min-height: 300px;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 80vh;
    min-height: 600px;
  }
`;

const GpuUtilSection = styled.div`
  height: 100%;
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const GpuUtilChartDiv = styled.div`
  height: calc(100% - 1rem);
  margin: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 1rem;
  width: calc(100% - 1.5rem);
  background: #212121;

  @media screen and (max-width: 768px) {
    width: calc(100% - 2rem);
    margin: 0.5rem 1rem;
  }
`;

const GpuMemSection = styled.div`
  height: 100%;
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const GpuMemChartDiv = styled.div`
  width: calc(100% - 1.5rem);
  height: calc(100% - 1rem);
  margin: 0.5rem 0 0 0.5rem;
  background-color: #212121;
  border-radius: 1rem;

  @media screen and (max-width: 768px) {
    width: calc(100% - 2rem);
    height: calc(100% - 1rem);
    margin: 0.5rem 1rem;
  }
`;

const NetworkSection = styled.div`
  height: 40vh;
  min-height: 300px;
  width: 100%;
`;

const NetworkChartDiv = styled.div`
  width: calc(100% - 2rem);
  margin: 0.5rem 1rem 1rem 1rem;
  height: calc(100% - 1.5rem);
  border-radius: 1rem;
  background: #212121;
`;

export default function InstanceCharts({ podId, baseUrl }) {
  const { colorMode } = useContext(Context);
  useEffect(() => {
    const socket = getSocketConnection({ baseUrl, podId });
    cpuChart(socket);
    ramChart(socket);
    gpuUtilChart(socket);
    gpuMemChart(socket);
    networkChart(socket);
  }, [baseUrl, podId]);

  return (
    <GpuTerminalContainer
      style={{
        filter:
          colorMode == "DARK"
            ? "invert(0) contrast(1)"
            : "invert(1) contrast(1.2)",
      }}
    >
      <TerminalTopSection>
        <CpuSection>
          <CpuChartDiv id="cpu-chart" />
        </CpuSection>
        <RamSection>
          <RamChartDiv id="ram-chart" />
        </RamSection>
      </TerminalTopSection>

      <TerminalMidSection>
        <GpuUtilSection>
          <GpuUtilChartDiv id="gpu-util-chart" />
        </GpuUtilSection>
        <GpuMemSection>
          <GpuMemChartDiv id="gpu-mem-chart" />
        </GpuMemSection>
      </TerminalMidSection>

      <NetworkSection>
        <NetworkChartDiv id="network-chart" />
      </NetworkSection>
    </GpuTerminalContainer>
  );
}

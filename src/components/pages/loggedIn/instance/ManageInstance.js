import { useState } from "react";
import styled from "styled-components";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import StartRenderingPanel from "./StartRenderingPanel";
import LivePreviewPanel from "./LivePreviewPanel";
import FilesPanel from "./FilesPanel";

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
  const [data, setData] = useState(placeholderData);

  return (
    <LoggedInBoilerplate titleLine1={data.title}>
      <Container>
        <Row1>
          <StartRenderingPanel />
          <LivePreviewPanel />
        </Row1>

        <FilesPanel />

        {/* <Column1></Column1> */}

        {/* <Column2></Column2> */}
      </Container>
    </LoggedInBoilerplate>
  );
}

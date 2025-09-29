import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import CustomLabel from "../../../applicationUI/CustomLabel";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import FileCard from "./FileCard";
import { BiDownload } from "react-icons/bi";
import Context from "../../../../Context";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  width: 100%;
  border-radius: 10px;
  padding: 40px;
  padding-bottom: 70px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const CustomInput = styled.input`
  background: var(--surface2);
  border-radius: 20px;
  color: var(--element);
  border: 1px solid var(--border);
  font-size: 15px;
  padding: 20px 20px;
  font-weight: 700;
  font-size: 15px;
`;

export default function FilesPanel({ podId, baseUrl }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!window.fileRefreshInterval) window.fileRefreshInterval = {};

    let thisInterval = window.fileRefreshInterval[podId];
    if (thisInterval) window.clearInterval(thisInterval);

    window.fileRefreshInterval[podId] = window.setInterval(() => {
      loadItems();
    }, 5000);

    return () => {
      let thisInterval = window.fileRefreshInterval[podId];
      if (thisInterval) window.clearInterval(thisInterval);
    };
  }, []);

  return (
    <Container>
      <CustomLabel>Files</CustomLabel>

      <Items>
        {data &&
          data.map((item) => <FileCard fileName={item} baseUrl={baseUrl} />)}
      </Items>

      <CustomPrimaryButton style={{ width: "330px", height: "60px" }}>
        <BiDownload />
        Download Everything
      </CustomPrimaryButton>
    </Container>
  );

  async function loadItems() {
    axios
      .post(`${baseUrl}/render_list`, {}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);

          // console.log(get().rendered_image_list)
        }
      });
  }
}

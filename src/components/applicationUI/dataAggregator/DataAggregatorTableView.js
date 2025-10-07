import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

const Container = styled.div`
  @media (min-width: 900px) {
    max-width: calc(100vw - 450px);
  }
`;

export default function DataAggregatorTableView({
  fields,
  items,
  onItemClick,
}) {
  let columns = [];

  let rows = [];

  for (let item of fields) {
    let fieldName = item.label;
    let fieldId = item.value;

    let fieldWidth = fieldName.length * 10;
    let max = 230;
    let minimum = 180;
    if (fieldWidth > max) fieldWidth = max;
    if (fieldWidth < minimum) fieldWidth = minimum;

    let itemData = {
      field: fieldId,
      headerName: fieldName,
      width: fieldWidth,
    };

    if (item.processFunction) {
      itemData.renderCell = (params) => {
        return item.processFunction(params.row);
      };
    }

    columns.push(itemData);
  }

  for (let item of items) {
    rows.push({ id: item["_id"], ...item });
  }

  return (
    <Container className="general-table">
      <Paper sx={{ height: 800, width: "100%" }}>
        <DataGrid
          showCellVerticalBorder
          onRowClick={(params) => {
            if (onItemClick) onItemClick(params);
          }}
          rows={rows}
          columns={columns}
          hideFooterPagination={true}
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "var(--surfaceSolid) !important",
            },
          }}
        />
      </Paper>
    </Container>
  );
}

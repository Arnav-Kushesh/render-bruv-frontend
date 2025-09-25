import { TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import MaterialInput from "./MaterialInput";
import styled from "styled-components";
import DropDownInput from "./DropDownInput";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: row;

  gap: 10px;
`;

let monthOptions = [
  { value: 0, label: "Jan" },
  { value: 1, label: "Feb" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Apr" },
  { value: 4, label: "Mar" },
  { value: 5, label: "Jun" },
  { value: 6, label: "Jul" },
  { value: 7, label: "Aug" },
  { value: 8, label: "Sep" },
  { value: 9, label: "Oct" },
  { value: 10, label: "Nov" },
  { value: 11, label: "Dec" },
];
let dateOptions = [];

let yearOptions = [];

for (let i = 1; i < 32; i++) {
  dateOptions.push({ label: i, value: i });
}

let newDate = new Date();

for (let i = 1940; i <= newDate.getFullYear(); i++) {
  yearOptions.push({ label: i, value: i });
}

yearOptions = yearOptions.reverse();

export default function CustomDateInput({ value, onChange, label, style }) {
  let theDate = new Date(value ? value : null);
  let date = theDate.getDate();
  let month = theDate.getMonth();
  let year = theDate.getFullYear();

  return (
    <Container style={style}>
      {label ? <Label>{label}</Label> : null}

      <Inputs>
        <DropDownInput
          options={dateOptions}
          value={theDate.getDate()}
          onChange={updateDate}
        />
        <DropDownInput
          options={monthOptions}
          value={theDate.getMonth()}
          onChange={updateMonth}
        />
        <DropDownInput
          options={yearOptions}
          value={theDate.getFullYear()}
          onChange={updateYear}
        />
      </Inputs>
    </Container>
  );

  function updateDate(newVal) {
    date = newVal;
    setDate(`${month + 1}/${date}/${year}`);
  }

  function updateMonth(newVal) {
    month = newVal + 1;
    setDate(`${month}/${date}/${year}`);
  }

  function updateYear(newVal) {
    year = newVal;
    setDate(`${month + 1}/${date}/${year}`);
  }
  function setDate(theDate) {
    let newDate = new Date(theDate);

    onChange(newDate.toISOString());
  }
}

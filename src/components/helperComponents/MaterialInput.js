import { TextField } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import frLocale from "date-fns/locale/fr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone.js";
import "dayjs/locale/fr";

dayjs.locale("fr");
dayjs.extend(utc);
dayjs.extend(timezone);

export default function MaterialInput({
  value,
  onChange,
  onTextChange,
  label,
  disableUnderline,
  fontSize,
  multiline,
  maxRows,
  onEnter,
  fontWeight,
  rows,
  type,
  autoFocus = false,
  onlyYear,
  variant = "filled",
  placeholder,
  style = {},
  surfaceColor = "var(--surface2)",
  elementColor = "var(--element)",
  borderColor = "var(--border)",
}) {
  if (type == "year") {
    type = "date";
    onlyYear = true;
  }

  if (type == "dateAndTime")
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={label}
          views={onlyYear ? ["year"] : null}
          onChange={(newDate) => {
            let newVal = newDate.utc().startOf("day").toISOString();
            onChange({ target: { value: newVal } });
          }}
          value={value ? dayjs(value) : null}
          sx={{
            input: {
              color: elementColor,
              opacity: 0.8,
              padding: "19px 17px !important",
            },
            root: { color: elementColor },
          }}
          InputProps={{
            disableUnderline: disableUnderline ? true : false,
            style: {
              overflow: "hidden",
              borderRadius: "10px",
              color: elementColor,
              ...style,
            },
          }}
        />
      </LocalizationProvider>
    );

  if (type == "date")
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <DatePicker
          variant={variant}
          label={label}
          timezone="UTC"
          views={onlyYear ? ["year"] : null}
          onChange={(newDate) => {
            try {
              let newVal = newDate.utc().startOf("day").toISOString();
              onChange({ target: { value: newVal } });
            } catch (e) {
              console.log("Invalid date value");
            }
          }}
          value={value ? dayjs(value) : null}
          sx={{
            "& .MuiSvgIcon-root": {
              color: elementColor, // icon color
              opacity: 0.7,
            },
            "& .MuiInputLabel-root": {
              color: elementColor, // label color
            },

            "& .MuiOutlinedInput-notchedOutline": {
              // border: "none", // Remove border
              border: `1px solid ${borderColor} !important`,
            },
            "& .MuiInputBase-input": {
              color: elementColor, // Optional: change text color if selected
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${borderColor}`,
            },
            "& .MuiInputBase-root": {
              backgroundColor: surfaceColor, // <-- Your desired background color
              borderRadius: "10px",
              color: elementColor,
            },
            input: {
              color: elementColor,
              padding: "19px 17px !important",
              minWidth: "200px",
            },
            root: { color: elementColor, border: "none" },
          }}
          InputProps={{
            disableUnderline: disableUnderline ? true : false,

            style: {
              overflow: "hidden",
              borderRadius: "10px",
              color: elementColor,

              ...style,
            },
          }}
        />
      </LocalizationProvider>
    );

  return (
    <TextField
      autoFocus={autoFocus}
      type={type}
      InputLabelProps={{
        style: { fontSize: fontSize, color: elementColor },
      }}
      inputProps={{
        inputMode: type === "number" ? `numeric` : null,
        pattern: type === "number" ? `[0-9]*` : null,
      }}
      InputProps={{
        disableUnderline: disableUnderline ? true : false,

        style: {
          fontSize: fontSize,
          fontWeight: fontWeight,
          borderRadius: "10px",
          color: elementColor,
          backdropFilter: "blur(20px)",
          background: surfaceColor,
          border: `1px solid ${borderColor}`,
          // boxShadow: "var(--lightShadow)",
          ...style,
        },
      }}
      sx={{ input: { color: elementColor } }}
      fullWidth
      multiline={multiline}
      maxRows={maxRows}
      placeholder={placeholder}
      onKeyDown={(ev) => {
        console.log(`Pressed keyCode ${ev.key}`);
        if (ev.key === "Enter") {
          if (onEnter) {
            onEnter(ev);
            ev.preventDefault();
          }
          // Do code here
        }
      }}
      rows={rows}
      value={value}
      onChange={(e) => {
        if (onChange) onChange(e);
        if (onTextChange) {
          onTextChange(e.target.value);
        }
      }}
      label={label}
      variant={variant}
    />
  );
}

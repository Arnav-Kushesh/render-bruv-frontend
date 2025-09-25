import goTo from "../../controllers/goTo";
import { Tab, Tabs } from "@mui/material";

export default function MaterialTabs({
  value,
  onChange,
  options,
  isLinkBased,
  orientation,
  tabStyle,
}) {
  if (isLinkBased) {
    value = window.location.pathname;

    if (value[value.length - 1] == "/") {
      value = value.substr(0, value.length - 1);
    }

    console.log(value);

    onChange = (e, newVal) => {
      console.log("new", newVal);
      goTo(newVal)();
    };
  }

  if (!options) {
    if (!value) value = false;

    options = [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ];
  }

  return (
    <Tabs
      orientation={orientation}
      value={value}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      {options.map((item) => (
        <Tab
          style={tabStyle}
          key={item.value}
          label={item.label}
          value={item.value}
        ></Tab>
      ))}
    </Tabs>
  );
}

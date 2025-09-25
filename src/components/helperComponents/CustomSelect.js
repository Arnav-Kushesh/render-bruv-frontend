import Select from "react-select";

export default function CustomSelect({ value, onChange, options }) {
  let theValue = value ? getValue(options, value) : options[0];

  return (
    <Select
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "15px",
          minHeight: "40px",
          paddingLeft: "5px",
          background: "var(--surface2)",
          opacity: 0.7,
          border: "none",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          marginLeft: "-11px",
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 15,
        paddingLeft: "25px",
        colors: {
          ...theme.colors,
          primary25: "var(--surface2)",
          neutral0: "var(--mainBackground)",
          neutral5: "var(--mainBackground)",
          neutral10: "var(--mainBackground)",
          neutral20: "var(--surface)",
          neutral30: "var(--element)",
          neutral40: "var(--element)",
          neutral50: "var(--element)",
          neutral60: "var(--element)",
          neutral70: "var(--element)",
          neutral80: "var(--element)",
          neutral90: "var(--element)",
        },
      })}
      value={theValue}
      onChange={(data) => {
        onChange(data.value);
      }}
      options={options}
    />
  );
}

function getValue(array, val) {
  for (let item of array) {
    if (item.value == val) return item;
  }

  return null;
}

import BigToggle from "./BigToggle";

export default function OptionPicker({ value, onChange, options, label }) {
  return (
    <BigToggle
      title={label ? label : "Select Option"}
      options={options.map((item) => getItem(item))}
    ></BigToggle>
  );

  function getItem(item) {
    return {
      onClick: () => {
        onChange(item.value);
      },
      isSelected: value === item.value,
      label: item.label,
    };
  }
}

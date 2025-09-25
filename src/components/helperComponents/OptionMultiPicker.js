import BigToggle from "./BigToggle";

export default function OptionMultiPicker({ value, onChange, options, label }) {
  if (!value) value = [];
  return (
    <BigToggle
      title={label ? label : "Select Options"}
      options={options.map((item) => getItem(item))}
    ></BigToggle>
  );

  function getItem(item) {
    return {
      onClick: () => {
        let newItems = [...value];

        let itemId = item.value;

        if (newItems.includes(itemId)) {
          let index = newItems.indexOf(itemId);
          newItems.splice(index, 1);
        } else {
          newItems.push(itemId);
        }

        onChange(newItems);
      },
      isSelected: value.includes(item.value),
      label: item.label,
    };
  }
}

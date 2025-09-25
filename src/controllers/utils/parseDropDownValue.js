import findFromArray from "./findFromArray";

export default function parseDropDownValue({ query, theArray }) {
  if (!query) return null;
  let val = findFromArray({
    query: query,
    theArray,
    field: "value",
  })?.label;

  return val || "Non";
}

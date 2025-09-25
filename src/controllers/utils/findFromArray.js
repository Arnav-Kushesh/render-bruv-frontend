export default function findFromArray({ theArray, field, query }) {
  for (let item of theArray) {
    if (item[field] == query) return item;
  }

  return null;
}

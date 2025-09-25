export default function transformToIdValuePair(items) {
  let data = {};

  for (let item of items) {
    data[item._id] = item;
  }

  return data;
}

export default function getUrlQuery(field) {
  let query = {};
  let queries = decodeURIComponent(window.location.search);
  if (!queries) {
    if (field) return null;
    return query;
  }

  queries = queries.replace("?", "").split("&");
  queries.map((item) => {
    let split = item.split("=");
    query[split[0]] = split[1];
  });

  if (field) return query[field];
  return query;
}

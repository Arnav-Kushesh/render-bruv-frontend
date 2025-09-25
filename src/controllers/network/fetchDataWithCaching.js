import { serverLine } from "./serverLine";

export default async function fetchDataWithCaching({
  path,
  setLoading,
  skipCache,
  onFreshData,
}) {
  let cacheID = `cache-${path}`;
  let cachedData = localStorage.getItem(cacheID);

  if (cachedData && !skipCache) {
    console.log("cache found", path);
    updateCache({ path, cacheID, onFreshData });
    return JSON.parse(cachedData);
  }

  if (setLoading && !skipCache) {
    setLoading(true);
    console.log("setloading true");
  }
  //Only do setLoading if skipCache if off
  //because when skip cache is onn we most likely already have the data

  return await updateCache({ path, cacheID, onFreshData: null, setLoading });
  //here onFreshData is null to avoid setState being called twice
}

async function updateCache({ path, cacheID, onFreshData, setLoading }) {
  console.log("caching", path);

  let newData = await serverLine.get(path);
  if (newData) {
    localStorage.setItem(cacheID, JSON.stringify(newData));
  } else {
    localStorage.removeItem(cacheID);
  }

  if (onFreshData) onFreshData(newData);

  if (setLoading) setLoading(false);

  return newData;
}

import { useEffect, useState } from "react";
import { serverLine } from "./serverLine.js";

export default function useServerline(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serverLine
      .get(url)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(setError);
  }, []);

  return { data, error, loading };
}

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useFetch = (apiCall, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  function fetch(params) {
    const { call, controller } = apiCall(params);
    controllerRef.current = controller;

    setIsLoading(true);
    call
      .then((res) => {
        setData(res.data);
        setError(null);
        if (options?.success) toast.success(options.success);
      })
      .catch((err) => {
        if (axios.isCancel()) {
        }
        setError(err.message || "Error inesperado");
        if (options?.error) toast.error(options.error);
      })
      .finally(() => {
        setIsLoading(false);
        if (options?.final) options.final();
      });
  }

  useEffect(() => {
    if (options?.autoFetch) return fetch(options?.params);

    return () => controllerRef.current?.abort();
  }, []);

  return { isLoading, data, error, fetch };
};

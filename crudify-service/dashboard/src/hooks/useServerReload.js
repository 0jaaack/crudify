import { useEffect } from "react";
import { useQuery } from "react-query";
import CONFIG from "../constants/config";

export function useServerReload(reloadTime, { onSuccess, onFail }) {
  const serverReloadState = useQuery("serverReloadState", async () => {
    const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/health`);
    const { data: state } = await response.json();

    return state === "ok";
  }, {
    staleTime: Infinity,
    retry: 1000,
    retryDelay: 10
  });

  useEffect(() => {
    const checkServerTimeout = setTimeout(() => {
      if (!serverReloadState) {
        onFail();
      }
    }, reloadTime);

    return () => {
      clearTimeout(checkServerTimeout);
    };
  }, []);

  if (serverReloadState) {
    return onSuccess();
  }
}

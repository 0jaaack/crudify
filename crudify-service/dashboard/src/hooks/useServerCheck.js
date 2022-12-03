import { useQuery } from "react-query";
import CONFIG from "../constants/config";

export function useCheckServer() {
  const serverState = useQuery(["serverState"], async () => {
    const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/health`);
    const { data: serverHealthState } = await response.json();

    return serverHealthState;
  }, {
    suspense: true,
    staleTime: CONFIG.QUERY_STALE_TIME,
    refetchOnWindowFocus: true
  });

  return serverState.data === "ok";
}

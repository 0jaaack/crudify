import { useQuery, useMutation, useQueryClient } from "react-query";
import CONFIG from "../../src/constants/config";

export function useEndpoints(collectionName) {
  const queryClient = useQueryClient();
  const endpoints = useQuery("endpoints", async () => {
    const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/apis/?collection=${collectionName}`);
    const { data: api } = await response.json();

    return api.data;
  }, {
    suspense: true,
    staleTime: CONFIG.QUERY_STALE_TIME,
    refetchOnWindowFocus: false
  });

  const refetchEndpoints = () => {
    queryClient.invalidateQueries("endpoints");
  };

  return [endpoints.data, refetchEndpoints];
}

export function useUpdateEndpoints(collectionName) {
  const mutateEndpoints = useMutation(async (endpoints) => {
    return await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/apis`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api: collectionName,
        endpoints
      }),
    });
  });

  return mutateEndpoints.mutate;
}

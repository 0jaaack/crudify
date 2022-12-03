import { useQuery, useMutation, useQueryClient } from "react-query";
import CONFIG from "../../src/constants/config";


export function useTypes(collectionName) {
  const queryClient = useQueryClient();
  const types = useQuery("types", async () => {
    const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/models/?collection=${collectionName}`);
    const { data: model } = await response.json();

    return model.data;
  }, {
    suspense: true,
    staleTime: CONFIG.QUERY_STALE_TIME,
    refetchOnWindowFocus: false
  });

  const refetchTypes = () => {
    queryClient.invalidateQueries("types");
  };

  return [types.data, refetchTypes];
}

export function useUpdateTypes(collectionName) {
  const mutateTypes = useMutation(async (types) => {
    return await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/models`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: collectionName,
        types
      }),
    });
  });

  return mutateTypes.mutate;
}

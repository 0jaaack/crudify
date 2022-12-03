import { useQuery, useMutation } from "react-query";
import CONFIG from "../../src/constants/config";

export function useCollections() {
  const collections = useQuery(["collections"], async () => {
    const response = await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/collections`);
    const { data: collections } = await response.json();

    return collections;
  }, {
    suspense: true,
    staleTime: CONFIG.QUERY_STALE_TIME,
    refetchOnWindowFocus: true
  });

  return collections.data;
}

export function useAddCollection() {
  const mutation = useMutation(async (newCollectionName) => {
    return await fetch(`${CONFIG.CRUDIFY_URL}/_dashboard/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCollectionName
      }),
    });
  });

  return mutation.mutate;
}

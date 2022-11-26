import React, { useState, createContext, useContext } from "react";

const CollectionsContext = createContext();
const SetCollectionsContext = createContext();

export function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState([]);

  return (
    <CollectionsContext.Provider value={collections}>
      <SetCollectionsContext.Provider value={setCollections}>
        {children}
      </SetCollectionsContext.Provider>
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  return useContext(CollectionsContext);
}

export function useSetCollections() {
  return useContext(SetCollectionsContext);
}

export function useCollectionsState() {
  const collections = useCollections();
  const setCollections = useSetCollections();

  return [collections, setCollections];
}

import React, { createContext, useReducer } from 'react';
import { collectionReducer } from '../reducer'

export const CollectionContext = createContext();

const initialState = {
  collection: []
}

const CollectionContextProvider = (props) => {
  const [collection, dispatch] = useReducer(collectionReducer, initialState);

  return (
    <CollectionContext.Provider value={{ collection, dispatch }}>
      {props.children}
    </CollectionContext.Provider>
  );
}
 
export default CollectionContextProvider;
import React, { createContext, useEffect, useReducer } from 'react';
import { collectionReducer } from '../reducer'

export const CollectionContext = createContext();

const initialState = {
  data: {}
}

const CollectionContextProvider = (props) => {
  const [collections, dispatch] = useReducer(collectionReducer, initialState, () => {
    const storedData = localStorage.getItem('collections')
    return {
      data: storedData ? JSON.parse(storedData) : {}
    }
  });

  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections.data))
  }, [collections])

  return (
    <CollectionContext.Provider value={{ collections, dispatch }}>
      {props.children}
    </CollectionContext.Provider>
  );
}
 
export default CollectionContextProvider;
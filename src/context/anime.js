import React, { createContext, useReducer } from 'react';
import { animeReducer } from '../reducer'

export const AnimeContext = createContext();

const initialState = {
  animeList: [],
  meta: {}
}

const AnimeContextProvider = (props) => {
  const [anime, dispatch] = useReducer(animeReducer, initialState);

  return (
    <AnimeContext.Provider value={{ anime, dispatch }}>
      {props.children}
    </AnimeContext.Provider>
  );
}
 
export default AnimeContextProvider;
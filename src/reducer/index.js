export const animeReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ANIME_LIST': 
      return {
        ...state,
        animeList: action.animeList,
        meta: action.meta
      }
    default:
      return state;
  }
} 

export const collectionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COLLECTION': 
      return {
        ...state,
        data: action.data
      }
    default:
      return state;
  }
}
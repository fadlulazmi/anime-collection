export const animeReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ANIME_LIST': 
      return {
        ...state,
        animeList: state.animeList.concat(action.animeList),
        meta: action.meta
      }
    default:
      return state;
  }
} 
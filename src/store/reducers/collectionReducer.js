import {
  FETCH_COLLECTION_START,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_ERROR,
  RESET_COLLECTION,
} from "store/constants/action-types";

const initialState = {
  pokemonGroup: [],
  catchDates: {},
  nextPage: 1,
  hasMore: false,
  loading: false,
  error: false,
};

function collectionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTION_START: {
      return { ...state, loading: true };
    }
    case FETCH_COLLECTION_SUCCESS: {
      const { pokemonGroup, nextPage, lastPage, catchDates } = action.payload;
      const newPokemonGroup = [...state.pokemonGroup, ...pokemonGroup];

      let page = Number(nextPage) || state.nextPage;
      let hasMore = lastPage ? Number(lastPage) >= Number(page) : state.hasMore;
      return {
        ...state,
        loading: false,
        pokemonGroup: newPokemonGroup,
        nextPage: page,
        hasMore,
        catchDates: catchDates,
      };
    }
    case FETCH_COLLECTION_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case RESET_COLLECTION: {
      console.log("reset collection");
      return {
        ...state,
        pokemonGroup: [],
        catchDates: {},
        nextPage: 1,
        hasMore: false,
        loading: false,
        error: false,
      };
    }
    default:
      return state;
  }
}

export default collectionReducer;

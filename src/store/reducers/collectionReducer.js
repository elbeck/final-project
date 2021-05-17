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
  loading: false,
  error: false,
};

function collectionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTION_START: {
      return { ...state, loading: true };
    }
    case FETCH_COLLECTION_SUCCESS: {
      const { pokemonGroup, nextPage, catchDates } = action.payload;
      const newPokemonGroup = [...state.pokemonGroup, ...pokemonGroup];
      return {
        ...state,
        loading: false,
        pokemonGroup: newPokemonGroup,
        nextPage: Number(nextPage),
        catchDates,
      };
    }
    case FETCH_COLLECTION_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case RESET_COLLECTION: {
      return {
        ...state,
        pokemonGroup: [],
        catchDates: {},
        nextPage: 1,
        loading: false,
        error: false,
      };
    }
    default:
      return state;
  }
}

export default collectionReducer;

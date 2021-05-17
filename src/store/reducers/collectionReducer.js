import {
  FETCH_COLLECTION_START,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_ERROR,
  ADD_COLLECTION_SUCCESS,
} from "store/constants/action-types";

const initialState = {
  pokemonGroup: [],
  catchDates: {},
  nextPage: null,
  loading: false,
  error: false,
};

function pokemonGroupReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTION_START: {
      return { ...state, loading: true };
    }
    case FETCH_COLLECTION_SUCCESS: {
      const { pokemonGroup, nextPage, catchDates } = action.payload;
      return {
        ...state,
        loading: false,
        pokemonGroup,
        nextPage,
        catchDates,
      };
    }
    case ADD_COLLECTION_SUCCESS: {
      const { pokemonGroup, nextPage, catchDates } = action.payload;
      const newPokemonGroup = [
        ...new Set([...state.pokemonGroup, ...pokemonGroup]),
      ];
      return {
        ...state,
        loading: false,
        pokemonGroup: newPokemonGroup,
        nextPage,
        catchDates,
      };
    }
    case FETCH_COLLECTION_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    default:
      return state;
  }
}

export default pokemonGroupReducer;

import {
  FETCH_POKEMON_BY_ID_START,
  FETCH_POKEMON_BY_ID_SUCCESS,
  FETCH_POKEMON_BY_ID_ERROR,
} from "store/constants/action-types";

const initialState = {
  pokemon: null,
  catchDate: null,
  loading: false,
  error: false,
};

function pokemonReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON_BY_ID_START: {
      return { ...state, loading: true };
    }
    case FETCH_POKEMON_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        pokemon: action.payload.pokemon,
        catchDate: action.payload.catchDate,
      };
    }
    case FETCH_POKEMON_BY_ID_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    default:
      return state;
  }
}

export default pokemonReducer;

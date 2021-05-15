import {
  FETCH_POKEMONS_START,
  FETCH_POKEMONS_SUCCESS,
  FETCH_POKEMONS_ERROR,
  FETCH_POKEMON_BY_ID_SUCCESS,
  SET_READY_TO_FETCH,
} from "store/actions/actionTypes";

const initialState = {
  pokemons: [],
  collection: new Set(),
  userId: 1,
  page: 1,
  hasMore: false,
  readyToFetch: true,
  pokemon: null,
  status: null,
  loading: false,
  error: false,
};

function pokemonsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMONS_START: {
      return { ...state, loading: true };
    }
    case FETCH_POKEMONS_SUCCESS: {
      const pokemons = [...state.pokemons, ...action.pokemons];
      let page = action.next || state.page;
      let hasMore = action.last - page > 1;
      return {
        ...state,
        loading: false,
        pokemons,
        page,
        hasMore,
        collection: action.collection,
      };
    }
    case FETCH_POKEMONS_ERROR: {
      console.warn(action.payload);
      return { ...state, loading: false, error: action.error };
    }
    case FETCH_POKEMON_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        pokemon: action.pokemon,
        status: action.status,
      };
    }
    case SET_READY_TO_FETCH: {
      return { ...state, readyToFetch: action.readyToFetch };
    }
    default:
      return state;
  }
}

export default pokemonsReducer;

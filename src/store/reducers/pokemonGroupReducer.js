import {
  FETCH_POKEMON_GROUP_START,
  FETCH_POKEMON_GROUP_SUCCESS,
  FETCH_POKEMON_GROUP_ERROR,
  RESET_POKEMON_GROUP,
} from "store/constants/action-types";

const initialState = {
  pokemonGroup: [],
  catchDates: {},
  nextPage: 1,
  hasMore: false,
  loading: false,
  error: false,
};

function pokemonGroupReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON_GROUP_START: {
      return { ...state, loading: true };
    }
    case FETCH_POKEMON_GROUP_SUCCESS: {
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
        catchDates,
      };
    }
    case FETCH_POKEMON_GROUP_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case RESET_POKEMON_GROUP: {
      console.log("reset pokemon group");
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

export default pokemonGroupReducer;

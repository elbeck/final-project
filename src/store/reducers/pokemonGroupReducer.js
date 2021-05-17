import {
  FETCH_POKEMON_GROUP_START,
  FETCH_POKEMON_GROUP_SUCCESS,
  FETCH_POKEMON_GROUP_ERROR,
  SET_READY_TO_FETCH,
} from "store/constants/action-types";

const initialState = {
  pokemonGroup: [],
  catchDates: {},
  page: 1,
  hasMore: false,
  readyToFetch: true,
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
      let page = nextPage || state.page;
      let hasMore = lastPage - page > 1;
      return {
        ...state,
        loading: false,
        pokemonGroup: newPokemonGroup,
        page,
        hasMore,
        catchDates,
      };
    }
    case FETCH_POKEMON_GROUP_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case SET_READY_TO_FETCH: {
      return { ...state, readyToFetch: action.readyToFetch };
    }
    default:
      return state;
  }
}

export default pokemonGroupReducer;

// import {
//   FETCH_POKEMON_GROUP_START,
//   FETCH_POKEMON_GROUP_SUCCESS,
//   FETCH_POKEMON_GROUP_ERROR,
//   ADD_POKEMON_GROUP_SUCCESS,
//   SET_READY_TO_FETCH,
// } from "store/constants/action-types";

// const initialState = {
//   pokemonGroup: [],
//   catchDates: {},
//   nextPage: null,
//   loading: false,
//   error: false,
//   readyToFetch: true,
// };

// function pokemonGroupReducer(state = initialState, action) {
//   switch (action.type) {
//     case FETCH_POKEMON_GROUP_START: {
//       return { ...state, loading: true };
//     }
//     case FETCH_POKEMON_GROUP_SUCCESS: {
//       const { pokemonGroup, nextPage, catchDates } = action.payload;
//       return {
//         ...state,
//         loading: false,
//         pokemonGroup,
//         nextPage,
//         catchDates,
//       };
//     }
//     case ADD_POKEMON_GROUP_SUCCESS: {
//       let { pokemonGroup, nextPage, catchDates } = action.payload;
//       const newPokemonGroup = [...state.pokemonGroup, ...pokemonGroup];
//       nextPage = nextPage || state.nextPage;
//       return {
//         ...state,
//         loading: false,
//         pokemonGroup: newPokemonGroup,
//         nextPage,
//         catchDates,
//       };
//     }
//     case FETCH_POKEMON_GROUP_ERROR: {
//       return { ...state, loading: false, error: action.error };
//     }
//     case SET_READY_TO_FETCH: {
//       return { ...state, readyToFetch: action.readyToFetch };
//     }
//     default:
//       return state;
//   }
// }

// export default pokemonGroupReducer;

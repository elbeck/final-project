import {
  FETCH_POKEMONS_START,
  FETCH_POKEMONS_SUCCESS,
  FETCH_POKEMONS_ERROR,
  FETCH_POKEMON_BY_ID_SUCCESS,
  SET_READY_TO_FETCH,
} from "store/actions/actionTypes";
import {
  getPokemons,
  getPokemonById,
  getRels,
  addRels,
  getRel,
} from "containers/makeRequest";

//=============================================================================================================

export function fetchPokemonsStart() {
  return {
    type: FETCH_POKEMONS_START,
  };
}

//=============================================================================================================

export function fetchPokemonsSuccess({ data, next, last }, collection) {
  return {
    type: FETCH_POKEMONS_SUCCESS,
    pokemons: data,
    next,
    last,
    collection,
  };
}

//=============================================================================================================

export function fetchPokemonsError(error) {
  return {
    type: FETCH_POKEMONS_ERROR,
    error,
  };
}

//=============================================================================================================

export function fetchPokemons() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPokemonsStart());

      const responsePokemons = await getPokemons(getState().pokemons.page);
      const responseCollection = await getRels();
      const collection = new Set();
      responseCollection.forEach((rel) => {
        collection.add(+rel.pokemonsId);
      });

      dispatch(fetchPokemonsSuccess(responsePokemons, collection));
    } catch (err) {
      dispatch(fetchPokemonsError(err));
    }
  };
}

// export function fetchPokemons() {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(fetchPokemonsStart());
//       const responsePokemons = await getPokemons(getState().pokemons.page);

//       if (getState().pokemons.userId) {
//         const responseCollection = await getRels();
//         const collection = new Set();
//         responseCollection.forEach((rel) => {
//           collection.add(+rel.pokemonsId);
//         });
//         dispatch(
//           fetchPokemonsAndCollectionSuccess(responsePokemons, collection)
//         );
//       } else {
//         dispatch(fetchPokemonsSuccess(responsePokemons));
//       }
//     } catch (err) {
//       dispatch(fetchPokemonsError(err));
//     }
//   };
// }

//=============================================================================================================

export function setReadyToFetch(readyToFetch) {
  return {
    type: SET_READY_TO_FETCH,
    readyToFetch,
  };
}

//=============================================================================================================

export function addInCollection(pokemonId, date) {
  return async (dispatch) => {
    try {
      dispatch(fetchPokemonsStart());
      await addRels(pokemonId, date);
      dispatch(fetchPokemons());
    } catch (err) {
      dispatch(fetchPokemonsError(err));
    }
  };
}

//=============================================================================================================

export function fetchPokemonById(pokemonId) {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPokemonsStart());

      const pokemon = await getPokemonById(pokemonId);
      const rel = await getRel(pokemonId);

      let status = rel.length
        ? { status: "caught", date: rel[0].date }
        : { status: "not caught" };

      dispatch(fetchPokemonByIdSuccess(pokemon, status));
    } catch (err) {
      dispatch(fetchPokemonsError(err));
    }
  };
}

//=============================================================================================================

function fetchPokemonByIdSuccess(pokemon, status) {
  return {
    type: FETCH_POKEMON_BY_ID_SUCCESS,
    pokemon,
    status,
  };
}

import {
  FETCH_POKEMON_BY_ID_START,
  FETCH_POKEMON_BY_ID_SUCCESS,
  FETCH_POKEMON_BY_ID_ERROR,
} from "store/constants/action-types";

import { getPokemonById, getRelById } from "api/make-request";

//=============================================================================================================

export function fetchPokemonByIdStart() {
  return {
    type: FETCH_POKEMON_BY_ID_START,
  };
}

function fetchPokemonByIdSuccess(payload) {
  return {
    type: FETCH_POKEMON_BY_ID_SUCCESS,
    payload,
  };
}

export function fetchPokemonByIdError(error) {
  return {
    type: FETCH_POKEMON_BY_ID_ERROR,
    error,
  };
}

//=============================================================================================================

export function fetchPokemonById(pokemonId) {
  return async (dispatch) => {
    try {
      dispatch(fetchPokemonByIdStart());

      const pokemon = await getPokemonById(pokemonId);
      const rel = await getRelById({ pokemonId });

      let catchDate = rel.length ? rel[0].date : null;

      dispatch(fetchPokemonByIdSuccess({ pokemon, catchDate }));
    } catch (err) {
      dispatch(fetchPokemonByIdError(err));
    }
  };
}

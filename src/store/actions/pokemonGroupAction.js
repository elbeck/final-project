import {
  FETCH_POKEMON_GROUP_START,
  FETCH_POKEMON_GROUP_SUCCESS,
  FETCH_POKEMON_GROUP_ERROR,
  SET_READY_TO_FETCH,
} from "store/constants/action-types";
import { getPokemonGroup, getRels, addRel } from "api/make-request";

//=============================================================================================================

export function fetchPokemonGroupStart() {
  return {
    type: FETCH_POKEMON_GROUP_START,
  };
}

export function fetchPokemonGroupSuccess(payload) {
  return {
    type: FETCH_POKEMON_GROUP_SUCCESS,
    payload,
  };
}

export function fetchPokemonGroupError(error) {
  return {
    type: FETCH_POKEMON_GROUP_ERROR,
    error,
  };
}

export function setReadyToFetch(readyToFetch) {
  return {
    type: SET_READY_TO_FETCH,
    readyToFetch,
  };
}

//=============================================================================================================

export function fetchPokemonGroup() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPokemonGroupStart());

      const page = getState().pokemonGroup.page;
      const {
        data: pokemonGroup,
        nextPage,
        lastPage,
      } = await getPokemonGroup(page);

      const rels = await getRels();
      const catchDates = rels.reduce((obj, rel) => {
        const pokemonId = Number(rel.pokemonsId);
        obj[pokemonId] = rel.date;
        return obj;
      }, {});

      dispatch(
        fetchPokemonGroupSuccess({
          pokemonGroup,
          nextPage,
          lastPage,
          catchDates,
        })
      );
    } catch (err) {
      dispatch(fetchPokemonGroupError(err));
    }
  };
}

export function addToCollection(pokemonId, catchDate) {
  return async (dispatch) => {
    try {
      // dispatch(fetchPokemonGroupStart());
      await addRel({ pokemonId, catchDate });
      dispatch(fetchPokemonGroup());
    } catch (err) {
      dispatch(fetchPokemonGroupError(err));
    }
  };
}

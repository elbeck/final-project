import {
  FETCH_COLLECTION_START,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_ERROR,
  ADD_COLLECTION_SUCCESS,
} from "store/constants/action-types";
import { getCollection, getRels, addRel } from "api/make-request";

//=============================================================================================================

export function fetchPokemonGroupStart() {
  return {
    type: FETCH_COLLECTION_START,
  };
}

export function fetchPokemonGroupSuccess(payload) {
  return {
    type: FETCH_COLLECTION_SUCCESS,
    payload,
  };
}

export function fetchPokemonGroupError(error) {
  return {
    type: FETCH_COLLECTION_ERROR,
    error,
  };
}

export function addPokemonGroupSuccess(payload) {
  return {
    type: ADD_COLLECTION_SUCCESS,
    payload,
  };
}

//=============================================================================================================

export function fetchPokemonGroup() {
  return async (dispatch) => {
    try {
      dispatch(fetchPokemonGroupStart());
      const page = 1;
      const {
        data: pokemonGroup,
        nextPage,
        date: catchDates,
      } = await getCollection(page);

      dispatch(
        fetchPokemonGroupSuccess({
          pokemonGroup,
          nextPage,
          catchDates,
        })
      );
    } catch (err) {
      dispatch(fetchPokemonGroupError(err));
    }
  };
}

export function addPokemonGroup() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPokemonGroupStart());

      const page = getState().pokemonGroup.nextPage;
      const { data: pokemonGroup, nextPage } = await getCollection(page);

      const rels = await getRels();
      const catchDates = rels.reduce((obj, rel) => {
        const pokemonId = Number(rel.pokemonsId);
        obj[pokemonId] = rel.date;
        return obj;
      }, {});

      dispatch(
        addPokemonGroupSuccess({
          pokemonGroup,
          nextPage,
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

import parseLinkHeader from "parse-link-header";
import axios from "axios";

const BASE_URL = "http://localhost:3004";
const CARDS_PER_PAGE = 48;
const USER_ID = 1;

export const getPokemonGroup = async (page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemons?_page=${page}&_limit=${CARDS_PER_PAGE}`
    );
    const links = parseLinkHeader(response.headers.link);
    const nextPage = links?.next._page;
    const lastPage = links?.last._page;
    return { data: response.data, nextPage, lastPage };
  } catch (err) {
    throw new Error(err);
  }
};

export const getRels = async (userId = USER_ID) => {
  try {
    const response = await axios.get(`${BASE_URL}/rels?usersId=${userId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPokemonById = async (pokemonId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemons/${pokemonId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getRelById = async ({ pokemonId, userId = USER_ID }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/rels?usersId=${userId}&pokemonsId=${pokemonId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addRel = async ({ pokemonId, userId = USER_ID, catchDate }) => {
  try {
    await axios.post(`${BASE_URL}/rels`, {
      usersId: userId,
      pokemonsId: pokemonId,
      date: catchDate,
    });
  } catch (err) {
    throw new Error(err);
  }
};

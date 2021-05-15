import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchPokemons,
  setReadyToFetch,
  addInCollection,
} from "store/actionCreators/actions";
import PokeCardDesk from "components/elements/poke-card-desk/poke-card-desk";

function CollectionPage(props) {
  const pokemons = props.pokemons.filter((pokemon) =>
    props.collection.has(pokemon.id)
  );

  useEffect(() => {
    if (props.hasMore) {
      document.addEventListener("scroll", scrollHandler);
      return () => {
        document.removeEventListener("scroll", scrollHandler);
      };
    }
    // eslint-disable-next-line
  }, [props.page]);

  useEffect(() => {
    if (props.readyToFetch) {
      props.setReadyToFetch(false);
      props.fetchPokemons();
    }
    // eslint-disable-next-line
  }, [props.readyToFetch]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (window.pageYOffset + window.innerHeight) <=
      window.innerHeight / 2
    ) {
      document.removeEventListener("scroll", scrollHandler);
      props.setReadyToFetch(true);
    }
  };

  return (
    <Container className="pt-4">
      <PokeCardDesk
        pokemons={pokemons}
        collection={props.collection}
        handleBtnClick={props.addInCollection}
      />
      {props.loading && (
        <div className="m-4 text-center" style={{ fontSize: "1.5rem" }}>
          Loading...
        </div>
      )}
      {props.error && (
        <div className="m-4 text-center" style={{ fontSize: "1.5rem" }}>
          {props.error.message}
        </div>
      )}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons.pokemons,
    collection: state.pokemons.collection,
    page: state.pokemons.page,
    hasMore: state.pokemons.hasMore,
    readyToFetch: state.pokemons.readyToFetch,
    loading: state.pokemons.loading,
    error: state.pokemons.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setReadyToFetch: (bool) => dispatch(setReadyToFetch(bool)),
    fetchPokemons: () => dispatch(fetchPokemons()),
    addInCollection: (pokemonId, date) =>
      dispatch(addInCollection(pokemonId, date)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);

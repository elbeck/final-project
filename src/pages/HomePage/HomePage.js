import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import PokeCardDesk from "components/PokeCardDesk/PokeCardDesk";
import {
  fetchPokemonGroup,
  addToCollection,
} from "store/actions/pokemonGroupAction";
import { resetCollection } from "store/actions/collectionAction";

function HomePage(props) {
  useEffect(() => {
    if (props.hasMore) {
      document.addEventListener("scroll", scrollHandler);
      return () => {
        document.removeEventListener("scroll", scrollHandler);
      };
    }
    // eslint-disable-next-line
  }, [props.nextPage]);

  useEffect(() => {
    props.reset();

    if (props.pokemonGroup.length === 0) {
      props.fetchPokemonGroup();
    }
    // eslint-disable-next-line
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (window.pageYOffset + window.innerHeight) <=
      window.innerHeight / 2
    ) {
      document.removeEventListener("scroll", scrollHandler);
      props.fetchPokemonGroup();
    }
  };

  return (
    <Container className="pt-4">
      <PokeCardDesk
        pokemonGroup={props.pokemonGroup}
        catchInfo={props.catchInfo}
        handleBtnClick={props.addToCollection}
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
    collection: state.collection.pokemonGroup,
    pokemonGroup: state.pokemonGroup.pokemonGroup,
    catchInfo: state.pokemonGroup.catchDates,
    nextPage: state.pokemonGroup.nextPage,
    hasMore: state.pokemonGroup.hasMore,
    loading: state.pokemonGroup.loading,
    error: state.pokemonGroup.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPokemonGroup: () => dispatch(fetchPokemonGroup()),
    addToCollection: (pokemonId, date) =>
      dispatch(addToCollection(pokemonId, date)),
    reset: () => dispatch(resetCollection()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React from "react";
import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import PokeCardDesk from "components/PokeCardDesk/PokeCardDesk";
import {
  fetchPokemonGroup,
  setReadyToFetch,
  addToCollection,
} from "store/actions/pokemonGroupAction";

function HomePage(props) {
  const rtf = useRef(true);

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
    console.log("useEffect RTF", props.readyToFetch);
    console.log("useEffect rtf", rtf);
    if (props.readyToFetch) {
      rtf.current = false;
      props.setReadyToFetch(false);
      props.fetchPokemonGroup();
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
      console.log("scroll RTF", props.readyToFetch);
      console.log("scroll rtf", rtf);
      rtf.current = true;
      props.setReadyToFetch(true);
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
    pokemonGroup: state.pokemonGroup.pokemonGroup,
    catchInfo: state.pokemonGroup.catchDates,
    page: state.pokemonGroup.page,
    hasMore: state.pokemonGroup.hasMore,
    readyToFetch: state.pokemonGroup.readyToFetch,
    loading: state.pokemonGroup.loading,
    error: state.pokemonGroup.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setReadyToFetch: (bool) => dispatch(setReadyToFetch(bool)),
    fetchPokemonGroup: () => dispatch(fetchPokemonGroup()),
    addToCollection: (pokemonId, date) =>
      dispatch(addToCollection(pokemonId, date)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

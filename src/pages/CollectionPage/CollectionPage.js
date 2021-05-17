import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import PokeCardDesk from "components/PokeCardDesk/PokeCardDesk";
import {
  fetchPokemonGroup,
  addPokemonGroup,
} from "store/actions/collectionAction";

function CollectionPage(props) {
  // const pokemonGroup = props.pokemonGroup.filter((pokemon) =>
  //   props.catchInfo.hasOwnProperty(pokemon.id)
  // );

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
    props.fetchPokemonGroup();
    // eslint-disable-next-line
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (window.pageYOffset + window.innerHeight) <=
      window.innerHeight / 2
    ) {
      document.removeEventListener("scroll", scrollHandler);
      props.addPokemonGroup();
      // props.setReadyToFetch(true);
    }
  };

  return (
    <React.Fragment>
      <PokeCardDesk
        pokemonGroup={props.pokemonGroup}
        catchInfo={props.catchInfo}
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
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    pokemonGroup: state.collection.pokemonGroup,
    catchInfo: state.collection.catchDates,
    nextPage: state.collection.nextPage,
    hasMore: state.collection.hasMore,
    loading: state.collection.loading,
    error: state.collection.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPokemonGroup: () => dispatch(fetchPokemonGroup()),
    addPokemonGroup: () => dispatch(addPokemonGroup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);

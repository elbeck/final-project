import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import PokeCardDesk from "components/PokeCardDesk/PokeCardDesk";
import { fetchPokemonGroup } from "store/actions/collectionAction";
import { resetPokemonGroup } from "store/actions/pokemonGroupAction";

function CollectionPage(props) {
  useEffect(() => {
    if (props.hasMore) {
      document.addEventListener("scroll", scrollHandle);
      return () => {
        document.removeEventListener("scroll", scrollHandle);
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

  const scrollHandle = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (window.pageYOffset + window.innerHeight) <=
      window.innerHeight / 2
    ) {
      document.removeEventListener("scroll", scrollHandle);
      props.fetchPokemonGroup();
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
    reset: () => dispatch(resetPokemonGroup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);

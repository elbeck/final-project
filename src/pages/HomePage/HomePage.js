import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import PokeCardDesk from "components/PokeCardDesk/PokeCardDesk";
import {
  fetchPokemonGroup,
  addToCollection,
} from "store/actions/pokemonGroupAction";
import { resetCollection } from "store/actions/collectionAction";
import PropTypes from "prop-types";

function HomePage(props) {
  useEffect(() => {
    if (props.nextPage > 1) {
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
    <React.Fragment>
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
          Error
        </div>
      )}
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    pokemonGroup: state.pokemonGroup.pokemonGroup,
    catchInfo: state.pokemonGroup.catchDates,
    nextPage: state.pokemonGroup.nextPage,
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

HomePage.propTypes = {
  pokemonGroup: PropTypes.arrayOf(PropTypes.object).isRequired,
  catchInfo: PropTypes.object.isRequired,
  handleBtnClick: PropTypes.func,
  nextPage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  fetchPokemonGroup: PropTypes.func,
  addToCollection: PropTypes.func,
  reset: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

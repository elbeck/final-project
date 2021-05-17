import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import PokeCardDesk from "components/PokeCardDesk/PokeCardDesk";
import { fetchPokemonGroup } from "store/actions/collectionAction";
import { resetPokemonGroup } from "store/actions/pokemonGroupAction";
import PropTypes from "prop-types";

function CollectionPage(props) {
  useEffect(() => {
    if (props.nextPage > 1) {
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
          Error
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

CollectionPage.propTypes = {
  pokemonGroup: PropTypes.arrayOf(PropTypes.object).isRequired,
  catchInfo: PropTypes.object.isRequired,
  handleBtnClick: PropTypes.func,
  nextPage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  fetchPokemonGroup: PropTypes.func,
  reset: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);

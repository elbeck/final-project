import React from "react";
import styles from "./PokeInfo.module.scss";
import unknownPokemonImg from "public/Unknown-pokemon.png";
import PropTypes from "prop-types";
import { capitalizeFirstLetter, convertDateFormat } from "helpers/func-helpers";

function PokeInfo(props) {
  function addDefaultSrc(e) {
    e.target.src = unknownPokemonImg;
  }

  return (
    <React.Fragment>
      <div className={`${styles.content}`}>
        <div className={styles.img}>
          <img onError={addDefaultSrc} src={`${props.id}.png`} alt="pokemon" />
        </div>
        <div className="mt-5 d-flex flex-column align-items-center ">
          <p className={styles.id}>id: {props.id}</p>
          <h1 className={styles.title}>{capitalizeFirstLetter(props.name)}</h1>
          {props.catchDate ? (
            <React.Fragment>
              <p className={styles.text}>
                Status: <strong>caught</strong>
              </p>
              <p className={styles.text}>
                {convertDateFormat(props.catchDate)}
              </p>
            </React.Fragment>
          ) : (
            <p className={styles.text}>
              Status: <strong>not caught</strong>
            </p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

PokeInfo.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  catchDate: PropTypes.string,
};

export default PokeInfo;

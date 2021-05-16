import React from "react";
import { Link, useLocation } from "react-router-dom";
import routeMap from "route-map/route-map";
import styles from "./PokeCard.module.scss";
import capitalizeFirstLetter from "helpers/capitalize-first-letter";
import unknownPokemonImg from "public/Unknown-pokemon.png";

function PokeCard(props) {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const collectionPath = routeMap.collection.path.split("/").pop();

  const btn = (
    <React.Fragment>
      {props.isPokemonCaught ? (
        <button
          className={[styles["btn"], styles["btn-caught"]].join(" ")}
          disabled
        >
          Caught
        </button>
      ) : (
        <button
          className={[styles["btn"], styles["btn-catch"]].join(" ")}
          onClick={handleBtnClick}
        >
          Catch
        </button>
      )}
    </React.Fragment>
  );

  function addDefaultSrc(e) {
    e.target.src = unknownPokemonImg;
  }

  function handleBtnClick(e) {
    e.preventDefault();
    e.target.disabled = true;

    const date = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    props.handleBtnClick(date);
  }

  return (
    <Link
      to={`/pokemons/${props.id}`}
      className={[props.className, styles.pokecard].join(" ")}
    >
      <div className={styles.left}>
        <div className={styles.title}>{capitalizeFirstLetter(props.name)}</div>
        {currentPath === collectionPath ? (
          <div>
            <b>Status:</b> caught
          </div>
        ) : (
          btn
        )}
      </div>
      <div className={styles.right}>
        <img onError={addDefaultSrc} src={props.imgPath} alt="pokemon" />
      </div>
    </Link>
  );
}

export default PokeCard;

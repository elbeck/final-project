import React from "react";
import styles from "./pokeball-loader.module.scss";

let classes = [styles.pokeball, styles.bounce];

function PokeballLoader() {
  return <div className={classes.join(" ")}></div>;
}

export default PokeballLoader;

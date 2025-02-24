import React from "react";
import style from "./Panel.module.css";

type TileProps = {
  text: string;
  translatedText: string | null;
  onTileClick: () => void;
};

const Tile: React.FC<TileProps> = (props) => {
  return (
    <li className={style["tile"]}>
      <div className={style["orignal"]}>{props.text}</div>
      <div className={style["translated"]}>{props.translatedText}</div>
      {/* <button onClick={props.onTileClick}>Translate</button> */}
    </li>
  );
};

export default Tile;

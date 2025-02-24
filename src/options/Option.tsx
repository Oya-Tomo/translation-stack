import React from "react";
import OptionStringItem from "./Item";
import style from "./Option.module.css";

const Option: React.FC = () => {
  return (
    <>
      <h1>Translation Stack - Options</h1>

      <ul className={style["items"]}>
        <OptionStringItem keyName="serverEndpoint" label="Endpoint" />
      </ul>
    </>
  );
};

export default Option;

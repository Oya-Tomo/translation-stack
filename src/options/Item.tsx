import React, { useEffect, useRef } from "react";
import style from "./Option.module.css";

type OptionItemProps = {
  label: string;
  keyName: string;
};

const OptionStringItem: React.FC<OptionItemProps> = (props) => {
  const formRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chrome.storage.sync.get(props.keyName, (data) => {
      if (typeof data[props.keyName] === "string") {
        formRef.current!.value = data[props.keyName];
      }
    });
  }, []);

  return (
    <li className={style["item"]}>
      <label className={style["label"]} htmlFor={props.keyName}>
        {props.label}
      </label>
      <input
        className={style["input"]}
        type="text"
        id={props.keyName}
        ref={formRef}
      />
      <button
        className={style["save-button"]}
        onClick={() => {
          chrome.storage.sync.set({
            [props.keyName]: formRef.current!.value,
          });
        }}
      >
        Save
      </button>
      <button
        className={style["recov-button"]}
        onClick={() => {
          chrome.storage.sync.get(props.keyName, (data) => {
            if (typeof data[props.keyName] === "string") {
              formRef.current!.value = data[props.keyName];
            }
          });
        }}
      >
        Recover
      </button>
    </li>
  );
};

export default OptionStringItem;

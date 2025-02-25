import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { translateWithGas } from "./api/gas";
import style from "./Panel.module.css";

type TileContent = {
  text: string;
  translatedText: string | null;
};

const Panel: React.FC = () => {
  const [contentList, setContentList] = useState<TileContent[]>([]);

  const listener = async (
    message: any,
    _sender: chrome.runtime.MessageSender,
    _sendResponse: (response?: any) => void
  ) => {
    if (message.action === "translateSelectedText") {
      setContentList((prevContentList) => [
        {
          text: message.text,
          translatedText: null,
        },
        ...prevContentList,
      ]);

      const translatedText = await translateWithGas(message.text);

      setContentList((prevContentList) =>
        prevContentList.map((content) =>
          content.text === message.text
            ? { ...content, translatedText: translatedText }
            : content
        )
      );
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(listener);
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);

  return (
    <ul className={style["list"]}>
      {contentList.map((content, index) => (
        <Tile
          key={index}
          text={content.text}
          translatedText={content.translatedText}
          onTileClick={() => {}}
        />
      ))}
    </ul>
  );
};

export default Panel;

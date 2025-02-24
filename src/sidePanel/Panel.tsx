import React, { useEffect, useState } from "react";
import Tile from "./Tile";
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
      console.log("message.text", message.text);

      setContentList((prevContentList) => [
        {
          text: message.text,
          translatedText: null,
        },
        ...prevContentList,
      ]);

      console.log("send translate", message.text);

      const data = await chrome.storage.sync.get("serverEndpoint");
      const serverEndpoint: string = data.serverEndpoint || "";

      await fetch(`${serverEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message.text, src: "", dst: "ja" }),
      })
        .then((response) => {
          response.json().then((data) => {
            setContentList((prevContentList) =>
              prevContentList.map((content) =>
                content.text === message.text
                  ? { ...content, translatedText: data.text }
                  : content
              )
            );
          });
        })
        .catch((_error) => {
          console.error("Error:", _error);
        });
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

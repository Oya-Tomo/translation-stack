import React, { useEffect, useState } from "react";

const Panel: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const listener = (
    message: any,
    _sender: chrome.runtime.MessageSender,
    _sendResponse: (response?: any) => void
  ) => {
    if (message.action === "translateSelectedText") {
      setSelectedText(message.text);
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(listener);
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);

  return (
    <>
      <h1>Selected text:</h1>
      <p>{selectedText}</p>
    </>
  );
};

export default Panel;

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translateSelectedText",
    title: "Translate selected text",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "translateSelectedText") {
    if (info.selectionText && info.selectionText?.length > 0) {
      chrome.runtime.sendMessage({
        action: "translateSelectedText",
        text: info.selectionText,
      });
    }
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "translateSelectedText") {
    console.log("Catch command: ", command);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          console.log("Execute script");
          const selection = window.getSelection();
          if (selection) {
            const text = selection.toString();
            if (text.length > 0) {
              chrome.runtime.sendMessage({
                action: "translateSelectedText",
                text,
              });
            }
          }
        },
      });
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "redirectPdfViewer") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      if (tab && tab.url) {
        const pdfJsUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
          tab.url
        )}`;
        chrome.tabs.update(tab.id!, { url: pdfJsUrl });
      } else {
        console.log("The current tab is not a PDF.");
      }
    });
  }
});

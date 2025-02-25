export const translateWithGas = async (key: string): Promise<string> => {
  const data = await chrome.storage.sync.get("serverEndpoint");
  const serverEndpoint: string = data.serverEndpoint || "";

  return await fetch(`${serverEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: key, src: "", dst: "ja" }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.text;
    })
    .catch((error) => {
      console.error(error);
      return "Error";
    });
};

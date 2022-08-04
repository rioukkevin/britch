import { setStorageBrightness, getStorageBrightness } from "./utils/memory";

const VIDEO_NODE = ".video-ref > video";
const updateBrightness = (value: number) => {
  const videoNodes = document.querySelector(VIDEO_NODE);

  const url = document.URL;
  const channelName = url.split("?")[0].replace("https://www.twitch.tv/", "");

  setStorageBrightness(channelName, value);
  // @ts-ignore
  videoNodes.style.filter = `brightness(${value})`;
};

const resetBrightness = () => {
  const videoNodes = document.querySelector(VIDEO_NODE);

  // @ts-ignore
  videoNodes.style.filter = undefined;
};

chrome.runtime.onMessage.addListener((msgObj) => {
  if (msgObj.type === "BrightBrightness") {
    updateBrightness(msgObj.value);
  }
});

const urlCheck = async () => {
  console.log("STATE CHANGE");
  const url = document.URL;
  const channelName = url.split("?")[0].replace("https://www.twitch.tv/", "");

  const storedBrightness = await getStorageBrightness(channelName);

  if (!!storedBrightness) updateBrightness(storedBrightness);
  else resetBrightness();
};

setInterval(urlCheck, 2000);

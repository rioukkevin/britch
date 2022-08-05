import {
  setStorageBrightness,
  getStorageBrightness,
  setStorageContrast,
  getStorageContrast,
} from "./utils/memory";

const VIDEO_NODE = ".video-ref > video";

const getChannelName = () => {
  const url = document.URL;
  return url.split("?")[0].replace("https://www.twitch.tv/", "");
};

const isTwitch = () => {
  const url = document.URL;
  return url.includes("https://www.twitch.tv/");
};

const updateFilter = (brightness: number, contrast: number) => {
  const videoNodes = document.querySelector(VIDEO_NODE);

  const channelName = getChannelName();

  setStorageBrightness(channelName, brightness);
  setStorageContrast(channelName, contrast);

  // @ts-ignore
  videoNodes.style.filter = `brightness(${brightness}) contrast(${contrast})`;
};

const reset = () => {
  const videoNodes = document.querySelector(VIDEO_NODE);
  // @ts-ignore
  videoNodes.style.filter = "";
};

const resetBrightness = (contrast: number) => {
  const videoNodes = document.querySelector(VIDEO_NODE);
  // @ts-ignore
  videoNodes.style.filter = `contrast(${contrast})`;
};

const resetContrast = (brightness: number) => {
  const videoNodes = document.querySelector(VIDEO_NODE);
  // @ts-ignore
  videoNodes.style.filter = `brightness(${brightness})`;
};

chrome.runtime.onMessage.addListener((msgObj) => {
  const run = async () => {
    if (!isTwitch()) return;
    const channelName = getChannelName();

    if (msgObj.type === "BrightBrightness") {
      const contrast = await getStorageContrast(channelName);
      updateFilter(msgObj.value, contrast ?? 1);
    }
    if (msgObj.type === "BrightContrast") {
      const brightness = await getStorageBrightness(channelName);
      updateFilter(brightness ?? 1, msgObj.value);
    }
  };
  run();
});

const urlCheck = async () => {
  if (!isTwitch()) return;

  const channelName = getChannelName();

  const storedBrightness = await getStorageBrightness(channelName);
  const storedContrast = await getStorageContrast(channelName);

  if (!!storedBrightness && !!storedContrast) {
    updateFilter(storedBrightness, storedContrast);
  } else if (!!storedBrightness) {
    updateFilter(storedBrightness, 1);
  } else if (!!storedContrast) {
    updateFilter(1, storedContrast);
  } else reset();
};

setInterval(urlCheck, 2000);

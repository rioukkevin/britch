const STORAGE_KEY = "brightBrightness";

type IBrightnessStorage = {
  [key: string]: number;
};

interface IStorage {
  [STORAGE_KEY]: IBrightnessStorage;
}

export const setStorageBrightness = async (name: string, value: number) => {
  const savedData = await chrome.storage.local.get([`${STORAGE_KEY}`]);
  const brightnessSetting: IBrightnessStorage = savedData[STORAGE_KEY];

  const newData = {
    ...brightnessSetting,
    [name]: value,
  };

  await chrome.storage.local.set({ [STORAGE_KEY]: newData });
};

export const getStorageBrightness = async (
  name: string
): Promise<number | undefined> => {
  const savedData = await chrome.storage.local.get([`${STORAGE_KEY}`]);
  const brightnessSetting: IBrightnessStorage = savedData[STORAGE_KEY];
  return brightnessSetting[name];
};

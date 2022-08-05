const STORAGE_KEY_BRIGHTNESS = "britchBrightness";
const STORAGE_KEY_CONTRAST = "britchContrast";

type IBrightnessStorage = {
  [key: string]: number;
};
type IContrastStorage = {
  [key: string]: number;
};

interface IStorage {
  [STORAGE_KEY_BRIGHTNESS]: IBrightnessStorage;
  [STORAGE_KEY_CONTRAST]: IContrastStorage;
}

export const setStorageBrightness = async (name: string, value: number) => {
  const savedData = await chrome.storage.local.get([
    `${STORAGE_KEY_BRIGHTNESS}`,
  ]);
  const brightnessSetting: IBrightnessStorage =
    savedData[STORAGE_KEY_BRIGHTNESS];

  const newData = {
    ...brightnessSetting,
    [name]: value,
  };

  await chrome.storage.local.set({ [STORAGE_KEY_BRIGHTNESS]: newData });
};

export const setStorageContrast = async (name: string, value: number) => {
  const savedData = await chrome.storage.local.get([`${STORAGE_KEY_CONTRAST}`]);
  const contrastSetting: IContrastStorage = savedData[STORAGE_KEY_CONTRAST];

  const newData = {
    ...contrastSetting,
    [name]: value,
  };

  await chrome.storage.local.set({ [STORAGE_KEY_CONTRAST]: newData });
};

export const getStorageBrightness = async (
  name: string
): Promise<number | undefined> => {
  const savedData = await chrome.storage.local.get([
    `${STORAGE_KEY_BRIGHTNESS}`,
  ]);
  const brightnessSetting: IBrightnessStorage =
    savedData[STORAGE_KEY_BRIGHTNESS];
  if (!brightnessSetting) return undefined;
  return brightnessSetting[name];
};

export const getStorageContrast = async (
  name: string
): Promise<number | undefined> => {
  const savedData = await chrome.storage.local.get([`${STORAGE_KEY_CONTRAST}`]);
  const contrastSetting: IContrastStorage = savedData[STORAGE_KEY_CONTRAST];
  if (!contrastSetting) return undefined;
  return contrastSetting[name];
};

import { Slider, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getStorageBrightness, getStorageContrast } from "./utils/memory";
import { theme } from "./utils/mui";

const emitBrightness = (value: number) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id ?? 0, {
      type: "BrightBrightness",
      value,
    });
  });
};

const emitContrast = (value: number) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id ?? 0, {
      type: "BrightContrast",
      value,
    });
  });
};

const marks = [
  {
    value: 0,
    label: "Min",
  },
  {
    value: 0.1,
    label: "",
  },
  {
    value: 0.2,
    label: "",
  },
  {
    value: 0.3,
    label: "",
  },
  {
    value: 0.4,
    label: "",
  },
  {
    value: 0.5,
    label: "0.5",
  },
  {
    value: 0.6,
    label: "",
  },
  {
    value: 0.7,
    label: "",
  },
  {
    value: 0.8,
    label: "",
  },
  {
    value: 0.9,
    label: "",
  },
  {
    value: 1,
    label: "default",
  },
  {
    value: 1.1,
    label: "",
  },
  {
    value: 1.2,
    label: "",
  },
  {
    value: 1.3,
    label: "",
  },
  {
    value: 1.4,
    label: "",
  },
  {
    value: 1.5,
    label: "1.5",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 2.5,
    label: "",
  },
  {
    value: 3,
    label: "Max",
  },
];

const Popup = () => {
  const [brightness, setBrightness] = useState<number | number[]>(1);
  const [contrast, setContrast] = useState<number | number[]>(1);

  const handleChangeBrightness = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      emitBrightness(newValue[0]);
    } else {
      emitBrightness(newValue);
    }
    setBrightness(newValue);
  };

  const handleChangeContrast = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      emitContrast(newValue[0]);
    } else {
      emitContrast(newValue);
    }
    setContrast(newValue);
  };

  const valuetext = (value: number) => {
    return `${value}`;
  };

  const valueLabelFormat = (value: number) => {
    return "groot";
  };

  useEffect(() => {
    const run = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const url = tab.url ?? "";
      const channelName = url
        .split("?")[0]
        .replace("https://www.twitch.tv/", "");

      const storedBrightness = await getStorageBrightness(channelName);
      const storedContrast = await getStorageContrast(channelName);

      if (!!storedBrightness) {
        setBrightness(storedBrightness);
        emitBrightness(storedBrightness);
      }
      if (!!storedContrast) {
        setContrast(storedContrast);
        emitContrast(storedContrast);
      }
    };
    run();
  }, []);

  return (
    <div
      style={{
        width: 400,
        height: 238,
        backgroundColor: "#FAFAFA",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "calc(100% + 40px)",
          height: 50,
          marginBottom: 15,
          backgroundColor: "#9147FF",
        }}
      >
        <img
          width={50}
          height={50}
          src="data:image/png;base64,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"
        />
        <h2 style={{ color: "white" }}>Britch</h2>
      </div>
      <h3 style={{ width: "100%", color: "#030030" }}>Brightness</h3>
      <Slider
        value={brightness}
        onChange={handleChangeBrightness}
        aria-label="Brightness"
        defaultValue={1}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        marks={marks}
        max={3}
        min={0}
        //@ts-ignore
        color="twitch"
      />
      <h3 style={{ width: "100%", color: "#030030" }}>Contrast</h3>
      <Slider
        value={contrast}
        onChange={handleChangeContrast}
        aria-label="Contrast"
        defaultValue={1}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        marks={marks}
        max={3}
        min={0}
        //@ts-ignore
        color="twitch"
      />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Popup />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../images/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../images/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "mist",
    url: new URL("../images/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../images/snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../images/night-clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../images/night-cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../images/night-rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "mist",
    url: new URL("../images/night-rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../images/night-snow.png", import.meta.url).href,
  },
];

export const coordinates = {
  latitude: 41.6023,
  longitude: -71.2503,
};

export const apiKey = "16d7f844926b0f47629f36f39edf40fa";

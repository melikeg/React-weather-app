import { createContext, useContext, useState, useEffect } from "react";
import cityData from "../data/cities_of_turkey.json";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState({
    id: 1,
    name: "Adana",
    latitude: "37.0000",
    longitude: "35.3213",
    population: 2183167,
    region: "Akdeniz",
  });
  const [weathers, setWeathers] = useState([]);
  const [unit, setUnit] = useState("metric");

  const values = {
    cities,
    setCities,
    selected,
    setSelected,
    weathers,
    setWeathers,
    unit,
    setUnit,
  };

  const apiKey = "a0dcc39f230dd1fb7311ffb5376be8d1";

  function getCities() {
    setCities(cityData);
  }
  const citylat = selected?.initialvalues?.[0].latitude
    ? selected?.initialvalues?.[0].latitude
    : selected.latitude;

  const citylon = selected?.initialvalues?.[0].longitude
    ? selected?.initialvalues?.[0].longitude
    : selected.longitude;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${citylat}&lon=${citylon}&exclude=minutely,hourly&units=${unit}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setWeathers(data));
    return;
  }, [selected, citylat, citylon, unit]);

  useEffect(() => {
    getCities();
    return;
  }, []);

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);

import { WholeAppContext } from "../App";

import "../assets/styles/weatherBox.css";
import { LoadingSpinnerWindow } from "./LoadingSpinner";

import { useContext, useEffect, useMemo, useState } from "react";

import axios from "axios";

const dayTime = [
  "01:00",
  "02:00",
  "03:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];

const WeatherBox = () => {
  const { lang } = useContext(WholeAppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, message: "" });
  const [timezone, setTimezone] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState(null);

  useMemo(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  //at start of the app
  useEffect(() => {
    const getLatitudeAndLongitude = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      } catch (error) {
        setError({ show: true, message: lang.weatherError1 });
        setIsLoading(false);
      }
    };

    getLatitudeAndLongitude();
  }, [lang]);

  // start fetching weather data, when all needed information loaded and also when language changed
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        axios(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true&timezone=${timezone}&temperature_unit=${
            lang.lng === "en-us" ? "fahrenheit" : "celsius"
          }`
        ).then((res) => {
          setWeatherData(res.data);
          setUnits(res.data.hourly_units.temperature_2m);
          setIsLoading(false);
        });
      } catch (error) {
        setError({ show: true, message: lang.weatherError3 });
        setIsLoading(false);
      }
    };

    if (latitude && longitude && lang && timezone) {
      fetchWeather();
    }
  }, [latitude, longitude, timezone, lang]);

  return (
    <div id="weather-box">
      {isLoading ? (
        <LoadingSpinnerWindow />
      ) : (
        !error.show && (
          <div className="weather-box__current-temp">
            <p>
              {weatherData?.current_weather?.temperature} {units}
            </p>

            <div className="weather-box__day-temp">
              {weatherData?.hourly?.temperature_2m
                .slice(0, 25)
                .map((item, index) => (
                  <p key={index}>
                    <span>
                      {item}
                      {units}
                    </span>
                    <span>{dayTime[index]}</span>
                  </p>
                ))}
            </div>
          </div>
        )
      )}
      {error.show && <div className="weather-box__error">{error.message}</div>}
    </div>
  );
};

export default WeatherBox;

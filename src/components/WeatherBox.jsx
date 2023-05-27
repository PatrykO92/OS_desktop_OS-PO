import "../assets/styles/weatherBox.css";
import { LoadingSpinner } from "./";

import { useEffect, useState } from "react";

import axios from "axios";

const apiTimeZoneKey = process.env.REACT_APP_TIME_ZONE_KEY;

const WeatherBox = ({ lang }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [timezone, setTimezone] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationNames, setLocationNames] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState(null);

  //at start of the app
  useEffect(() => {
    console.log("Fetch Location");

    const fetchLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      } catch (error) {
        console.error("Error fetching location");
      }
    };

    fetchLocation();
  }, []);

  // start after getting location
  useEffect(() => {
    const fetchTimezone = async () => {
      try {
        const response = await axios.get(
          `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiTimeZoneKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`
        );
        console.log(response.data);
        const { nextAbbreviation, cityName, countryName } = response.data;
        setTimezone(nextAbbreviation);
        setLocationNames({ city: cityName, country: countryName });
      } catch (error) {
        console.error("Error fetching time zone");
      }
    };

    if (latitude && longitude) {
      console.log("Fetch Timezone");
      fetchTimezone();
    }
  }, [latitude, longitude]);

  // start when all needed information loaded and when language changed
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
        console.log("Error fetching weather");
      }
    };

    if (latitude && longitude && lang && timezone) {
      console.log("Fetch Weather");
      fetchWeather();
    }
  }, [latitude, longitude, timezone, lang]);

  return (
    <div id="weather-box">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="weather-box__current-temp">
          <p>
            {weatherData.current_weather.temperature} {units}
          </p>
          <p>
            {locationNames.city}, {locationNames.country} ({timezone})
          </p>
        </div>
      )}

      <button
        onClick={() => {
          console.log(weatherData);
        }}
      >
        Click
      </button>
    </div>
  );
};

export default WeatherBox;

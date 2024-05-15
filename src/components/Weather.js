import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Weather({ city }) {
  const apikey=process.env.REACT_APP_API_KEY
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setError(null);
      try {
        const response = await axios.get(
          "https://yahoo-weather5.p.rapidapi.com/weather",
          {
            params: {
              location: city,
              format: "json",
              u: "f",
            },
            headers: {
              "X-RapidAPI-Key":apikey,
              "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
            },
          }
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error.response.data);
        setError("Could not fetch weather data");
      }
    };

    fetchWeather();
  }, [city]);

  // Function to format time in 12-hour format
  const formatTime = (time) => {
    const date = new Date(time * 1000);
    const options = {
      timeZone: "Asia/Karachi", // Set time zone to Pakistan
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <div>
      {weatherData && (
        <div>
          <h2 className="text-center my-2">
            Weather for {weatherData.location.city}, {weatherData.location.country}
          </h2>
          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center my-4">
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal primary">Temperatures</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    {weatherData.current_observation.condition.temperature}°F
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>
                      Temperature is{" "}{weatherData.current_observation.condition.temperature}°F
                    </li>
                    <li>Min Temperature is {weatherData.forecasts[0].low}°F</li>
                    <li>Max Temperature is {weatherData.forecasts[0].high}°F</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Humidity info</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    {weatherData.current_observation.atmosphere.humidity}%
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>
                      Visibility is{" "}
                      {weatherData.current_observation.atmosphere.visibility}
                    </li>
                    <li>
                      Condition:{" "}
                      {weatherData.current_observation.condition.text}
                    </li>
                    <li>
                      Humidity is{" "}
                      {weatherData.current_observation.atmosphere.humidity}%
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Wind info</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    {weatherData.current_observation.wind.speed} km/hr
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>
                      Wind Direction is {weatherData.current_observation.wind.direction}
                    </li>
                    <li>
                      Sunrise is{" "}
                      {formatTime(
                        weatherData.current_observation.astronomy.sunrise
                      )}
                    </li>
                    <li>
                      Sunset is{" "}
                      {formatTime(
                        weatherData.current_observation.astronomy.sunset
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

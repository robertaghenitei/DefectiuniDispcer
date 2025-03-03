import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Weather.css";

function Weather() {
  const [temp, setTemp] = useState("0");

  const [humidity, setHumidity] = useState("0");
  const [desc, setDesc] = useState("0");
  const [weather, setWeather] = useState("0");
  const [errorDisplay, setErrorDisplay] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = () => {
    api
      .get("/api/vremea/")
      .then((res) => res.data)
      .then((data) => displayWeatherInfo(data))
      .catch((error) => setErrorDisplay(error));
  };

  const displayWeatherInfo = (data) => {
    setTemp(data.main.temp);
    setHumidity(data.main.humidity);
    setWeather(data.weather[0].description);
    getWeatherEmoji(data.weather[0].id);
    console.log(data.weather[0].id);
  };

  const getWeatherEmoji = (weatherId) => {
    switch (true) {
      case weatherId >= 200 && weatherId < 300:
        setEmoji("⛈");
        break;
      case weatherId >= 300 && weatherId < 400:
        setEmoji("🌧");
        break;
      case weatherId >= 500 && weatherId < 600:
        setEmoji("🌧");
        break;
      case weatherId >= 600 && weatherId < 700:
        setEmoji("❄");
        break;
      case weatherId >= 700 && weatherId < 800:
        setEmoji("🌫");
        break;
      case weatherId === 800:
        setEmoji("🌞");
        break;
      case weatherId > 800 && weatherId <= 900:
        setEmoji("☁");
        break;
    }
  };

  const displayError = (message) => {};

  return (
    <div className="card">
      <h1 className="cityDisplay">Botosani</h1>
      <p className="tempDisplay">{temp}°C</p>
      <p className="humidityDisplay">Umezeala: {humidity}%</p>
      <p className="descDisplay">{weather}</p>
      <p className="weatherEmoji">{emoji}</p>
      {errorDisplay && <p className="errorDisplay">{errorDisplay}</p>}
    </div>
  );
}

export default Weather;

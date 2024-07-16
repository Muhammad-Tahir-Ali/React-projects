import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import sun from ".//assets/clear.png";
import rain from ".//assets/rain.png";
import snow from ".//assets/snow.png";
import smoke from ".//assets/mist.png";
import clouds from ".//assets/cloud.png";
import axios from "axios";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("London");
  const [searchCity, setSearchCity] = useState("");
  const apiKey = "81cba420e33f59c6c7681a7420f47e2c";

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, apiKey]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchCity);
  };

  const getWeatherImage = (description) => {
    if (description.includes("clear")) {
      return sun;
    } else if (description.includes("cloud")) {
      return clouds;
    } else if (description.includes("rain")) {
      return rain;
    } else if (description.includes("smoke")) {
      return smoke;
    } else {
      return "https://example.com/default.png"; // Default image URL
    }
  };

  return (
    <div className="pt-10 pb-10 min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 to-blue-800 text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-neon">
          Weather App
        </h1>
        <form onSubmit={handleSearch} className="mb-6 flex justify-center">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city"
            className="border-2 border-blue-500 flex-grow p-2 bg-gray-800 rounded-l-lg focus:outline-none max-w-xs text-white placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-neon bg-blue-500 text-white p-2 rounded-r-lg hover:bg-neon-dark transition duration-300"
          >
            Search
          </button>
        </form>
        {loading && (
          <div className="text-center">
            <PulseLoader color="#00caff" />
          </div>
        )}
        {error && (
          <div className="text-center text-red-500">
            Error fetching weather data: {error.message}
          </div>
        )}
        {weatherData && (
          <div className="flex flex-wrap w-full lg:w-auto mt-8">
            <div
              className="w-full lg:w-1/2 flex rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80')`,
              }}
            >
              <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-black bg-opacity-70 text-white">
                <div className="mb-20">
                  <h2 className="font-bold text-3xl leading-none pb-1">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </h2>
                  <h3 className="leading-none pb-2 pl-1">
                    {new Date().toLocaleDateString()}
                  </h3>
                  <p className="flex items-center opacity-75 text-2xl">
                    <svg
                      className="w-4 inline mr-1 text-2xl"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 425.963 425.963"
                      fill="#00FF7F"
                    >
                      <path d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z" />
                    </svg>
                    {weatherData.name}, {weatherData.sys.country}
                  </p>
                </div>
                <div>
                  <img
                    src={getWeatherImage(weatherData.weather[0].description)}
                    alt={weatherData.weather[0].description}
                    className="w-16 mb-2"
                  />
                  <h1 className="font-light text-8xl leading-none mb-2">
                    {Math.round(weatherData.main.temp)}ºC
                  </h1>
                  <p className="font-light text-lg uppercase tracking-widest">
                    {weatherData.weather[0].description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-12">
              <div className="bg-gradient-to-r from-purple-800 to-blue-800 p-8 rounded-lg shadow-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-neon">
                  Weather Details
                </h2>
                <div className="flex justify-between w-64 mb-8">
                  <p className="uppercase opacity-75 text-white">Cloudiness</p>
                  <p className="text-white">{weatherData.clouds.all}%</p>
                </div>
                <div className="flex justify-between w-64 mb-8">
                  <p className="uppercase opacity-75 text-white">Humidity</p>
                  <p className="text-white">{weatherData.main.humidity}%</p>
                </div>
                <div className="flex justify-between w-64 mb-8">
                  <p className="uppercase opacity-75 text-white">Wind</p>
                  <p className="text-white">{weatherData.wind.speed} m/s</p>
                </div>
                <div className="flex justify-between w-64 mb-8">
                  <p className="uppercase opacity-75 text-white">Min Temp</p>
                  <p className="text-white">
                    {Math.round(weatherData.main.temp_min)}ºC
                  </p>
                </div>
                <div className="flex justify-between w-64 mb-8">
                  <p className="uppercase opacity-75 text-white">Max Temp</p>
                  <p className="text-white">
                    {Math.round(weatherData.main.temp_max)}ºC
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;

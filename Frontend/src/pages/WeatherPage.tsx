import { useState } from "react";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { getWeather } from "../store/thunks/weatherThnuks";

const WeatherPage = () => {
  const [city, setCity] = useState<string>("");

  const dispatch = useAppDispatch();
  const { error, isLoading, weatherData } = useAppSelector(
    (state) => state.weather
  );

  const handleSearch = () => {
    if (!city.trim()) return;
    dispatch(getWeather(city));
  };

  return (
    <div className="h-full flex items-center justify-center bg-linear-to-br from-blue-200 to-blue-500 p-4 text-white">
      
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 space-y-4">

        <h1 className="text-2xl font-bold text-center">🌤 Weather App</h1>

       
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city name..."
            className="input input-bordered w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>

        
        {error && (
          <div className="alert alert-error text-sm">
            {error}
          </div>
        )}

      
        {weatherData && (
          <div className="bg-base-200 rounded-xl p-4 text-center space-y-2">
            
            <h2 className="text-xl font-semibold">
              {weatherData.name}
            </h2>

            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <p className="capitalize">
              {weatherData.weather[0].description}
            </p>

            <p className="text-3xl font-bold">
              {weatherData.main.temp}°C
            </p>

            <div className="flex justify-around text-sm mt-2">
              <span>💧 {weatherData.main.humidity}%</span>
              <span>🌬 {weatherData.wind.speed} m/s</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default WeatherPage;

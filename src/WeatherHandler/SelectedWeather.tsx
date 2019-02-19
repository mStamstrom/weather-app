import * as React from "react";
import { Weather } from "src/models/Weather";
import WeatherIconSelector from "../shared/WeatherIconSelector";
import './SelectedWeather.css';

interface IPropsView {
  weather: Weather;
}
function getWeatherIcon(selectedWeather: Weather): string {
  if (selectedWeather.weather && selectedWeather.weather.length > 0) {
    return selectedWeather.weather[0].main;
  }
  return '';
}

const SelectedWeatherView: React.SFC<IPropsView> = ({ weather }) => {
  if (weather.main === null || weather.main === undefined) {
    return null;
  }
  return (
    <div className="selected-weather-view">
      <div className="current-weather">
        <div>
          {Math.round(weather.main.temp)}°
        </div>
        <WeatherIconSelector icon={getWeatherIcon(weather)} />
      </div>
      <div className="detailed-data">
        <div>
          <div className="detailed-data__label">Wind</div>
          <div>{weather.wind.speed} m/s
            <span>
              <i style={{ transform: `rotate(${weather.wind.deg}deg`}} className="fas fa-arrow-up"/>
            </span>
          </div>
        </div>
        <div>
          <div className="detailed-data__label">Humidity</div>
          <div>{weather.main.humidity}%</div>
        </div>
        <div>
          <div className="detailed-data__label">Pressure</div>
          <div>{weather.main.pressure}hPa</div>
        </div>
      </div>
    </div>
  );
}

export default SelectedWeatherView;

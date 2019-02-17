import * as React from "react";
import { Weather } from "src/models/Weather";
import { formatDate } from "src/util/DateHelper";
import WeatherIconSelector from "./WeatherIconSelector";
import './WeatherListItem.css';

interface IWeatherViewProps {
  weather: Weather;
  selectedWeather: Weather;
  changeSelectedWeather: ((weather: Weather) => void); // TODO: remove till parent component
}

const WeatherListItem: React.SFC<IWeatherViewProps> = ({weather, selectedWeather, changeSelectedWeather}) => {
  const onClick = () => changeSelectedWeather(weather);

  const isSelected = weather.dt === selectedWeather.dt;

  return (
    <button onClick={onClick} className={`weather-list-item ${isSelected ? 'weather-list-item--selected' : ''}`}>
      <div className="weather-list-date">
        {formatDate(weather.dt_txt)}
      </div>
      <div>
      <WeatherIconSelector icon={weather.weather[0].main} />
      </div>
      <div>
        {Math.round(weather.main.temp)}°
      </div>
    </button>
  );
}

export default WeatherListItem;

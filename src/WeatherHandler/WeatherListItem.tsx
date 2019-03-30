import * as React from "react";
import { Weather } from "../models/Weather";
import { formatDate } from "../util/DateHelper";
import WeatherIconSelector from "../shared/WeatherIconSelector";
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
      <span>
        {formatDate(weather.dt_txt)}
      </span>
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

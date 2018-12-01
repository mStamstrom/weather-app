import * as React from "react";
import { Weather } from "src/models/Weather";
import WeatherIconSelector from "./WeatherIconSelector";
import './WeatherListItem.css';


interface IWeatherViewProps {
  weather: Weather;
  changeSelectedWeather: ((weather: Weather) => void);
}


function formatDate(date: string) {
  const formatedDate = new Date(date.replace(' ', 'T'));
  const time = `${formatedDate.getHours()}`.length === 1 ? `0${formatedDate.getHours()}` : `${formatedDate.getHours()}`;
  return time;
}

const WeatherListItem: React.SFC<IWeatherViewProps> = ({weather, changeSelectedWeather}) => {
  const onClick = () => changeSelectedWeather(weather);

  return (
    <button onClick={onClick} className="weather-list-item">
      <div className="weather-list-date">
        {formatDate(weather.dt_txt)}
      </div>
      <div>
      <WeatherIconSelector type={weather.weather[0].main} />
      </div>
      <div>
        {Math.round(weather.main.temp)}°
      </div>
    </button>
  );
}

export default WeatherListItem;

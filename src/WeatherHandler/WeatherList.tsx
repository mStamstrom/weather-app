import * as React from 'react';
import { Weather } from 'src/models/Weather';
import { getDayFromDateString } from 'src/util/DateHelper';
import { structureWeatherIntoDays } from 'src/util/WeatherListHelper';
import './WeatherList.css';
import WeatherListItem from './WeatherListItem';

interface IProps {
  weatherList: Weather[];
  selectedWeather: Weather;
  changeSelectedWeather: (selectedWeather: Weather) => void;
}


export const WeatherList: React.SFC<IProps> = ({ weatherList, selectedWeather, changeSelectedWeather }) => {
  const structuredWeather = structureWeatherIntoDays(weatherList);
  return (<div className="weather-list scrollbar">
    {Object.keys(structuredWeather).map(dayOfWeather => (<div key={dayOfWeather} className="day-container">
      <span className="day-title">
        {getDayFromDateString(dayOfWeather)}
      </span>
      <div className="day-weather-container">
        {structuredWeather[dayOfWeather].map((item: Weather) =>
        <WeatherListItem key={item.dt} weather={item} selectedWeather={selectedWeather} changeSelectedWeather={changeSelectedWeather} />)}
      </div>
    </div>))}
  </div>);
}

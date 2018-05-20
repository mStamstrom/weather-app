import * as React from 'react';
import { City } from '../models/City';
import './CityItemView.css';
import WeatherIconSelector from './WeatherIconSelector';

interface IProps {
  city: City;
  weatherList: City[];
}

function formatDate(date: string) {
  const formatedDate = new Date(date.replace(' ', 'T'));
  const time = `${formatedDate.getHours()}`.length === 1 ? `0${formatedDate.getHours()}:00` : `${formatedDate.getHours()}:00`;
  return `${formatedDate.getMonth() + 1} / ${formatedDate.getDate()} ${time}`;
}

const CityItemView: React.SFC<IProps> = ({ city, weatherList }) => (
  <div className="city-item">
    <div className="weather-list">
      {weatherList.map(item => (
        <div key={item.dt} className="weather-list-item">
          <div className="weather-list-date">
            {formatDate(item.dt_txt)}
          </div>
          <div className="weather-item">
            <div>
              {Math.round(item.main.temp)}
            </div>
            <div>
              <WeatherIconSelector type={item.weather[0].main} />
            </div>
          </div>
        </div>))}
    </div>
  </div>
);

export default CityItemView;

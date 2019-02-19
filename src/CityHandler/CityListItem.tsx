import * as React from 'react';
import { City } from '../models/City';
import WeatherIconSelector from '../shared/WeatherIconSelector';
import './CityListItem.css';

interface IProps {
  item: City;
  removeItem: any;
}
const CityListItem: React.SFC<IProps> = ({ item, removeItem }) => {
  const removeItemHandler = (e: any) => removeItem(item, e);
  return (
    <a href={`city/${item.id}`} className="city-list-item">
      <span className="city-list-item__text">
        {item.name}
      </span>
      <div className="city-list-item--flex">
        <span className="city-list-item__text">
          {Math.round(item.main.temp)}
        </span>
        <WeatherIconSelector icon={item.weather[0].main} />
        <button type="button" className="city-list-item__remove-button" onClick={removeItemHandler}>
          <i className="fa fa-2x fa-minus-circle" />
        </button>
      </div>
    </a>
  );
}

export default CityListItem;

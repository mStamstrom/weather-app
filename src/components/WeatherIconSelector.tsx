import * as React from 'react';
import './WeatherIconSelector.css';

interface IProps {
  type: string;
}

const WeatherIconSelector: React.SFC<IProps> = ({ type }) => {
  switch (type) {
    case 'Rain':
      return (<span className="fas fa-tint weather-icon--rain" />);
    case 'Sun':
    case 'Clear':
      return (<span className="fas fa-sun weather-icon--sun" />);
    case 'Snow':
      return (<span className="fas fa-snowflake" />);
    case 'Clouds':
    case 'Fog':
    default:
      return (<span className="fas fa-cloud weather-icon--clouds" />);
  }
};

export default WeatherIconSelector;

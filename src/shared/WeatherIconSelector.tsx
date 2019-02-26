import { faCloud, faSnowflake, faSun, faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

interface IWeatherIconProps {
  icon: string;
}

const WeatherIconSelector: React.SFC<IWeatherIconProps> = ({ icon }) => {
  switch (icon) {
    case 'Sun':
    case 'Clear':
      return (<FontAwesomeIcon icon={faSun} color="yellow" />);
    case 'Rain':
      return (<FontAwesomeIcon icon={faTint} color="blue" />);
    case 'Snow':
      return (<FontAwesomeIcon icon={faSnowflake} />);
    case 'Clouds':
    case 'Fog':
    default:
      return (<FontAwesomeIcon icon={faCloud} color="grey" />);
  }
};

export default WeatherIconSelector;

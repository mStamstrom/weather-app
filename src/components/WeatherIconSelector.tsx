import * as React from 'react';

interface IProps {
  type: string;
}

const WeatherIconSelector: React.SFC<IProps> = ({ type }) => {
  switch (type) {
    case 'Rain':
      return (<span className="fas fa-tint" />);
    case 'Sun':
    case 'Clear':
      return (<span className="fas fa-sun" />);
    case 'Snow':
      return (<span className="fas fa-snowflake" />);
    case 'Clouds':
    case 'Fog':
    default:
      return (<span className="fas fa-cloud" />);
  }
};

export default WeatherIconSelector;

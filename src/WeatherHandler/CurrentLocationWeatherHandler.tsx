import * as React from 'react';
import { City } from '../models/City';
import { getWeatherForecastForPosition } from '../util/Api';
import WeatherDisplayer from './WeatherDisplayer';

interface IState {
  city: City,
  weatherList: City[],
}

class CurrentLocationWeatherHandler extends React.Component<{}, IState> {
  public state = {
    city: new City(),
    weatherList: [],
  };

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherForecastForPosition(latitude, longitude)
        .then(res => this.setState({ city: res.city, weatherList: res.list }))
        .catch(error => console.error(error)); //tslint:disable-line
    });
  }

  public render() {
    return <WeatherDisplayer weatherList={this.state.weatherList} cityName={this.state.city.name} />;
  }
}

export default CurrentLocationWeatherHandler;

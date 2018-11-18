import * as React from 'react';
import CityItemView from '../components/CityItemView';
import Header from '../components/Header';
import { City } from '../models/City';
import { getWeatherForecastForPosition } from '../util/Api';

interface IState {
  city: City,
  weatherList: City[],
}

class CurrentLocationCity extends React.Component<{}, IState> {
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
    return (
      <div>
        <Header name={this.state.city.name} />
        <div className="App-body">
          <CityItemView weatherList={this.state.weatherList} />
        </div>
    </div>
    );
  }
}

export default CurrentLocationCity;

import * as React from 'react';
import { City } from '../models/City';
import { Weather } from '../models/Weather';
import { getWeatherForecast } from '../util/Api';
import WeatherDisplayer from './WeatherDisplayer';

interface IState {
  city: City;
  weatherList: Weather[];
}

interface IProps {
  match: {params: {id: string}};
}
class WeatherHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      city: new City(),
      weatherList: [],
    };
  }

  public componentDidMount() {
    getWeatherForecast(this.props.match.params.id)
      .then(res => this.setState({ city: res.city, weatherList: res.list }))
      .catch(error => console.error('error', error)); //tslint:disable-line
  }


  public render() {
    return (
      <WeatherDisplayer weatherList={this.state.weatherList} cityName={this.state.city.name}/>
    );
  }
}

export default WeatherHandler;

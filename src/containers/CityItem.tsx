import * as React from 'react';
import CityItemView from '../components/CityItemView';
import Header from '../components/Header';
import { City } from '../models/City';
import { getWeatherForecast } from '../util/Api';

interface IState {
  city: City;
  weatherList: City[];
}

interface IProps {
  match: {params: {id: string}};
}
class CityItem extends React.Component<IProps, IState> {
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
      <div>
        <Header name={this.state.city.name} />
        <div className="App-body">
          <CityItemView weatherList={this.state.weatherList} />
        </div>
      </div>
    );
  }
}

export default CityItem;

/* tslint:disable no-empty-interface */
import * as React from 'react';
import Header from '../header/Header';
import { City } from '../models/City';
import { LocalStorageCity } from '../models/LocalStorageCity';
import { getCurrentWeather, getCurrentWeatherForPosition, getCurrentWeathers } from '../util/Api';
import * as store from '../util/Store';
import AddCity from './AddCity';
import './CityHandler.css';
import CityListItem from './CityListItem';
import Error from './Error';

interface IProps {}
interface IState {
  cities: City[],
  error: string,
}

class CityHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cities: [],
      error: '',
    };
    this.removeItem = this.removeItem.bind(this);
    this.addCity = this.addCity.bind(this);
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      
      getCurrentWeatherForPosition(latitude, longitude)
        .then((res) => {
          const { cities } = this.state;
          cities.unshift(res);
          this.setState({ cities });
        })
        .catch(() => this.setState({ error: 'Could not get weather of current location' }));
    });
    const storedCities = store.getCities();
    if (storedCities.length > 0) {
      const ids = storedCities.map(a => a.id).reduce((a, b) => `${a},${b}`);
      getCurrentWeathers(ids)
        .then(res => this.setState({ cities: res.list }))
        .catch(() => this.setState({ error: 'Could not get weather for stored cities' }));
    }
  }

  public render() {
    return (
      <div className="full-scale city-handler">
        {this.state.error ? 
          <Error errorString={this.state.error} />
          : ''}
        <div className="App-cities">
          <Header name="City view" />
          
          {this.state.cities.map(item => (
            <CityListItem key={item.name} item={item} removeItem={this.removeItem} />
            ))}
        </div>
        <div className="App-cities">
          <AddCity
            addCity={this.addCity}
          />
        </div>
      </div>
    );
  }

  private addCity(cityText: string) {
    const { cities } = this.state;
    if (cities.find(x => x.name.toLowerCase() === cityText.toLowerCase()) !== undefined) {
      this.setState({ error: 'City already exists' });
      return;
    }
    getCurrentWeather(cityText)
      .then((res) => {
        cities.push(res);
        store.addCity(new LocalStorageCity(res.id, cityText));
        this.setState({
          cities,
        });
      })
      .catch(() => this.setState({ error: 'Could not get weather for specified city' }));
  }

  private removeItem(item: City, e: any) {
    e.preventDefault();
    const { cities } = this.state;
    const filteredCities = cities.filter(x => x.name !== item.name);
    store.removeCity(item);
    this.setState({
      cities: filteredCities,
    });
  }
}

export default CityHandler;

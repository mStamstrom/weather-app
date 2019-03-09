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
  cityText: string,
  error: string,
}

class CityHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cities: [],
      cityText: '',
      error: '',
    };
    this.removeItem = this.removeItem.bind(this);
    this.onChange = this.onChange.bind(this);
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
            onChange={this.onChange}
            addCity={this.addCity}
            cityText={this.state.cityText}
          />
        </div>
      </div>
    );
  }

  private onChange(event: any) {
    if (event === null) {
      return;
    }
    if (event.target !== null && event.target.value !== null) {
      this.setState({ cityText: event.target.value }); // tslint: disable-line
    }
  }

  private addCity(e: any) {
    e.preventDefault();
    const { cities, cityText } = this.state;
    if (cities.find(x => x.name.toLowerCase() === cityText.toLowerCase()) !== undefined) {
      // todo: add error handling
      return;
    }
    getCurrentWeather(cityText)
      .then((res) => {
        cities.push(res);
        store.addCity(new LocalStorageCity(res.id, cityText));
        this.setState({
          cities,
          cityText: '',
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

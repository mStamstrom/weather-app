/* tslint:disable no-empty-interface */
import * as React from 'react';
import AddCity from '../components/AddCity';
import CityListItem from '../components/CityListItem';
import { City } from '../models/City';
import { LocalStorageCity } from '../models/LocalStorageCity';
import { getCurrentWeather, getCurrentWeatherForPosition, getCurrentWeathers } from '../util/Api';
import * as store from '../util/Store';

interface IProps {}
interface IState {
  cities: City[],
  cityText: string,
}

class CityList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cities: [],
      cityText: '',
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
        .catch(error => console.error(error));//tslint:disable-line
    });
    const storedCities = store.getCities();
    if (storedCities.length > 0) {
      const ids = storedCities.map(a => a.id).reduce((a, b) => `${a},${b}`);
      getCurrentWeathers(ids)
        .then(res => this.setState({ cities: res.list }))
        .catch(error => console.error(error)); //tslint:disable-line
    }
  }

  public render() {
    return (
      <div>
        <div className="App-cities">
          {this.state.cities.map(item => (
            <CityListItem key={item.name} item={item} removeItem={this.removeItem} />
            ))}
        </div>
        <div className="App-cities">
          <AddCity
            value={this.state.cityText}
            onChange={this.onChange}
            addCity={this.addCity}
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

  private addCity() {
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
      .catch(error => console.error('error', error)); //tslint:disable-line
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

export default CityList;

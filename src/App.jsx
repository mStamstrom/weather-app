import React, { Component } from 'react';
import CityItem from './components/CityItem';
import getCityWeather from './util/Api';
import * as store from './util/Store';
import './App.css';
import AddCity from './components/AddCity';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: store.getCities(),
      cityText: '',
    };
  }

  onChange(event) {
    this.setState({ cityText: event.target.value });
  }

  addCity() {
    const { cities, cityText } = this.state;
    if (cities.find(x => x.name.toLowerCase() === cityText.toLowerCase()) !== undefined) {
      // todo: add error handling
      return;
    }
    const newCity = {
      name: cityText,
      weather: 0,
    };
    getCityWeather(cityText)
      .then((res) => {
        newCity.weather = res.main.temp;
        cities.push(newCity);
        store.addCity(newCity);
        this.setState({
          cities,
          cityText: '',
        });
      })
      .catch(error => console.error('error', error));
  }

  removeItem(item) {
    const { cities } = this.state;
    const filteredCities = cities.filter(x => x.name !== item.name);
    store.removeCity(item);
    this.setState({
      cities: filteredCities,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weather app</h1>
        </header>
        <div className="App-body">
          <div className="App-cities">
            {this.state.cities.map(item => (
              <CityItem key={item.name} item={item} removeItem={x => this.removeItem(x)} />
            ))}
          </div>
          <AddCity
            value={this.state.cityText}
            onChange={event => this.onChange(event)}
            addCity={() => this.addCity()}
          />
        </div>
      </div>
    );
  }
}

export default App;

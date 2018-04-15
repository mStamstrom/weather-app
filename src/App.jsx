import React, { Component } from 'react';
import CityItem from './components/CityItem';
import getCityWeather from './Api';
import './App.css';
import AddCity from './components/AddCity';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      cityText: '',
    };
  }

  onChange(event) {
    this.setState({ cityText: event.target.value });
  }

  addCity() {
    const { cities, cityText } = this.state;
    const newCity = {
      name: cityText,
      weather: 0,
    };
    getCityWeather(cityText)
      .then((res) => {
        newCity.weather = res.main.temp;
        cities.push(newCity);
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

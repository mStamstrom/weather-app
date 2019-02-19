/* tslint:disable jsx-boolean-value */
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import CityHandler from './CityHandler/CityHandler';
import CurrentLocationWeatherHandler from './WeatherHandler/CurrentLocationWeatherHandler';
import WeatherHandler from './WeatherHandler/WeatherHandler';

const baseUrl = process.env.PUBLIC_URL;

interface IState {
  error: string,
};


class App extends React.Component<{}, IState> {
  public state = {
    error: '',
  };

  public render() {
    if (this.state.error !== '') {
      return <div>{this.state.error}</div>;
    }
    return (
      <div className="App">
        <Router>
          <div className="route-container">
            <Route exact path={`${baseUrl}/`} component={CurrentLocationWeatherHandler} />
            <Route path={`${baseUrl}/list`} component={CityHandler} />
            <Route path={`${baseUrl}/city/:id`} component={WeatherHandler} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

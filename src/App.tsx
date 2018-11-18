/* tslint:disable jsx-boolean-value */
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import CityItem from './containers/CityItem';
import CityList from './containers/CityList';
import CurrentLocationCity from './containers/CurrentLocationCity';

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
          <div>
            <Route exact path={`${baseUrl}/`} component={CurrentLocationCity} />
            <Route path={`${baseUrl}/list`} component={CityList} />
            <Route path={`${baseUrl}/city/:id`} component={CityItem} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

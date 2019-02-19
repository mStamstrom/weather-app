import * as React from 'react';
import Header from '../header/Header';
import { Weather } from '../models/Weather';
import SelectedWeather from './SelectedWeather';
import './WeatherDisplayer.css';
import { WeatherList } from './WeatherList';

interface IProps {
  weatherList: Weather[];
  cityName: string;
}

interface IState {
  selectedWeather: Weather;
  weatherIcon: string;
}

function getWeatherIcon(selectedWeather: Weather): string {
  if (selectedWeather.weather && selectedWeather.weather.length > 0) {
    return selectedWeather.weather[0].main;
  }
  return '';
}

function getBackgroundClass(selectedWeather: Weather): string {
  const date = new Date(selectedWeather.dt*1000);
  if (19 < date.getHours() || date.getHours() < 6) {
    return 'weather-displayer--night';
  }
  if (selectedWeather.weather && selectedWeather.weather.length > 0) {
    if (selectedWeather.weather[0].main === 'Sun') {
      return 'weather-displayer--sun';
    }
    if (selectedWeather.weather[0].main === 'Clear') {
      return 'weather-displayer--sun';
    }
    if (selectedWeather.weather[0].main === 'Rain') {
      return 'weather-displayer--rain';
    }
    if (selectedWeather.weather[0].main === 'Snow') {
      return 'weather-displayer--snow';
    }
    if (selectedWeather.weather[0].main === 'Clouds') {
      return 'weather-displayer--clouds';
    }
    return 'weather-displayer--clouds';

  }
  return '';
}


class WeatherDisplayer extends React.PureComponent<IProps, IState> {
  public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.weatherList.length > 0 && prevState.selectedWeather.main === undefined) {
      const selectedWeather = nextProps.weatherList[0];
      return {
        selectedWeather,
        weatherIcon: getWeatherIcon(selectedWeather),
      }
    }
    return null;
  }
  public state = {
    selectedWeather: new Weather(),
    weatherIcon: '',
  }


  public render () {
    const backgroundClass = getBackgroundClass(this.state.selectedWeather);
    return (
      <div className={`weather-displayer ${backgroundClass}`}>
        <Header name={this.props.cityName} />
      <div className="city-item">
        <SelectedWeather
          weather={this.state.selectedWeather}
        />
      </div>
      <div className="footer">
        <WeatherList weatherList={this.props.weatherList} selectedWeather={this.state.selectedWeather} changeSelectedWeather={this.changeSelectedWeather} />
      </div>
      </div>
    );
  }
  private changeSelectedWeather = (selectedWeather: Weather) => {
    this.setState({
      selectedWeather,
      weatherIcon: getWeatherIcon(selectedWeather),
    });
  }
}

export default WeatherDisplayer;

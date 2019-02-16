import * as React from 'react';
import { Weather } from '../models/Weather';
import './CityItemView.css';
import Header from './Header';
import SelectedWeatherView from './SelectedWeatherView';
import WeatherListItem from './WeatherListItem';

interface IProps {
  weatherList: Weather[];
  cityName: string;
}

interface IState {
  selectedWeather: Weather;
  currentDay: string;
  weatherIcon: string;
}

function getSelectedDay(dateTime: number): string {
  const date = new Date(dateTime*1000);
  const dayOfWeek = date.getDay();
  if (dayOfWeek === (new Date().getDay())) {
    return 'Today';
  }
  switch (dayOfWeek) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}

function getWeatherIcon(selectedWeather: Weather): string {
  if (selectedWeather.weather && selectedWeather.weather.length > 0) {
    return selectedWeather.weather[0].main;
  }
  return '';
}

// TODO: currentDay should be calc on scroll not click
class CityItemView extends React.PureComponent<IProps, IState> {
  public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.weatherList.length > 0 && prevState.selectedWeather.main === undefined) {
      const selectedWeather = nextProps.weatherList[0];
      return {
        currentDay: getSelectedDay(selectedWeather.dt),
        selectedWeather,
        weatherIcon: getWeatherIcon(selectedWeather),
      }
    }
    return null;
  }
  public state = {
    currentDay: 'Today',
    selectedWeather: new Weather(),
    weatherIcon: '',
  }


  public render () {
    return (
      <div className="city-item-view">
        <Header name={this.props.cityName} />
      <div className="city-item">
        <SelectedWeatherView
          weather={this.state.selectedWeather}
        />
      </div>
      <div className="footer">
        <div className="footer__day">{this.state.currentDay}</div>
        <div className="weather-list scrollbar">
          {this.props.weatherList.map(item =>
            <WeatherListItem key={item.dt} weather={item} selectedWeather={this.state.selectedWeather} changeSelectedWeather={this.changeSelectedWeather} />)}
        </div>
      </div>
      </div>
    );
  }
  public changeSelectedWeather = (selectedWeather: Weather) => {
    this.setState({
      currentDay: getSelectedDay(selectedWeather.dt),
      selectedWeather,
      weatherIcon: getWeatherIcon(selectedWeather),
    });
  }
}

export default CityItemView;

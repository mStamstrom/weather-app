/// <reference types="jest" />

import { structureWeatherIntoDays } from './WeatherListHelper';

describe('weatherListHelper', () => {
  it('when getting list of weather should be returned sorted by day of month', () => {
    const weather = {
      dt: 1,
      dt_txt: '2019-10-01 00:00',
      id: '0',
      main: {temp: 2, pressure: 2, humidity: 0},
      name: 'test',
      weather: [],
      wind: {speed: 0, deg: 2}
     }
     const weather2 = {
      dt: 1,
      dt_txt: '2019-10-02 00:00',
      id: '0',
      main: {temp: 2, pressure: 2, humidity: 0},
      name: 'test2',
      weather: [],
      wind: {speed: 0, deg: 2}
     }
     const weather3 = {
      dt: 1,
      dt_txt: '2019-10-01 00:00',
      id: '1',
      main: {temp: 2, pressure: 2, humidity: 0},
      name: 'test3',
      weather: [],
      wind: {speed: 0, deg: 2}
     }
    const sortedWeather = structureWeatherIntoDays([weather, weather2, weather3]);
    expect(sortedWeather).toEqual({
      '2019-10-01': [weather, weather3],
      '2019-10-02': [weather2]
    });
  });
});

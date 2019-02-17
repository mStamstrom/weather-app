import { Weather } from "src/models/Weather";

export function structureWeatherIntoDays(weatherList: Weather[]): any {
  const sortedWeather = {};
  for(const weather of weatherList) {
    const dateString = weather.dt_txt.split(' ')[0];
    if (Object.keys(sortedWeather).find(x => x === dateString)) {
      sortedWeather[dateString].push(weather);
    } else {
      sortedWeather[dateString] = [weather];
    }
  }
  return sortedWeather;
}
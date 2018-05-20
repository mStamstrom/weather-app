import { City } from "../models/City";
import { LocalStorageCity } from "../models/LocalStorageCity";

const localStorageCities = 'weather-cities';

export function getCities(): LocalStorageCity[] {
  return JSON.parse(localStorage.getItem(localStorageCities) || '[]');
}

export function addCity(city: LocalStorageCity) {
  const cities = getCities();
  cities.push(city);
  localStorage.setItem(localStorageCities, JSON.stringify(cities));
}

export function removeCity(city: City) {
  const cities = getCities();
  const filteredCities = cities.filter(x => x.name !== city.name);
  localStorage.setItem(localStorageCities, JSON.stringify(filteredCities));
}

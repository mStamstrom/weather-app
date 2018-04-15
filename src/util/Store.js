const localStorageItem = 'weather-cities';

export function getCities() {
  return JSON.parse(localStorage.getItem(localStorageItem) || '[]');
}

export function addCity(city) {
  const cities = getCities();
  cities.push(city);
  localStorage.setItem(localStorageItem, JSON.stringify(cities));
}

export function removeCity(city) {
  const cities = getCities();
  const filteredCities = cities.filter(x => x.name !== city.name);
  localStorage.setItem(localStorageItem, JSON.stringify(filteredCities));
}

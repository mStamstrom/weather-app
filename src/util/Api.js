
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '6a703ad20e8fe394b475a7a2450b2c65';
export default function getWeather(city) {
  return fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
}

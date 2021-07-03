import React from 'react';
import CityHandler from './CityHandler';
import { render, fireEvent, screen } from '@testing-library/react'

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: 'i'
}));

describe('CityHandler', () => {
  beforeEach(() => {
    var globalRef: any = global;
    globalRef.fetch = jest.fn().mockImplementation((a) => {
      console.log('mock value', a);
      var response = {"coord":{"lon":17.6089,"lat":59.8692},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":19.43,"feels_like":19.07,"temp_min":18.04,"temp_max":23.44,"pressure":1016,"humidity":63},"visibility":10000,"wind":{"speed":5.66,"deg":20},"clouds":{"all":0},"dt":1625134482,"sys":{"type":1,"id":1731,"country":"SE","sunrise":1625103193,"sunset":1625170400},"timezone":7200,"id":2666219,"name":"Uppsala Municipality","cod":200};
      if (a === 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=794fd1eb804018f71fb274449e212c02&units=metric') {
        response = {"coord":{"lon":17.6089,"lat":59.8692},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":19.43,"feels_like":19.07,"temp_min":18.04,"temp_max":23.44,"pressure":1016,"humidity":63},"visibility":10000,"wind":{"speed":5.66,"deg":20},"clouds":{"all":0},"dt":1625134482,"sys":{"type":1,"id":1731,"country":"SE","sunrise":1625103193,"sunset":1625170400},"timezone":7200,"id":2666219,"name":"Stockholm Municipality","cod":200};
        return Promise.resolve(({
          status: 200,
          json: () => Promise.resolve(response),
        }))
      }
      return Promise.resolve(({
        status: 200,
        json: () => Promise.resolve(response),
      }));
    });
    globalRef.navigator.geolocation = {getCurrentPosition: jest.fn().mockImplementation((callback) => callback({coords: { latitude: 55, longitude: 55 }}))};
  });
  it('should render current city', async () => {
    render(<CityHandler/>);
    await screen.findByText('Uppsala Municipality');
  });
  it('user should be able to add new cities to list', async () => {

    render(<CityHandler/>);
    fireEvent.change(screen.getByRole('textbox'), { target: {value: 'Stockholm'}});
    fireEvent.click(screen.getByTestId('plus-button'));

    await screen.findByText('Stockholm Municipality');
    await screen.findByText('Uppsala Municipality');

  });
});
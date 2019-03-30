describe('weather e2e tests', () => {
  it('when visiting startpage, weather for current location should be shown, with forcast for future 5 days', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(contentWindow) {
        cy.stub(contentWindow.navigator.geolocation, 'getCurrentPosition', (callback) => {
          callback({
            coords: {
              latitude: 59.3293235,
              longitude: 18.0685808
            }
          });
        })
    }});
    
    cy.get('.App-header').contains('Stockholm');
    cy.get('.current-temperature').should($span => {
      // check that temperature is digit
      let weather = $span.text();
      weather = parseInt(weather);
      expect(typeof weather).to.eq('number');
    });
    cy.get('.weather-list-item').then(items => {
      expect(items.length).to.be.greaterThan(30);
    });
  });

  it('when selecting new weather in forecast, detailed information about weather is shown', () => {
    cy.visit('http://localhost:3000');

    cy.get('.current-weather .current-temperature').then(($beforeTemperature) => {
      const beforeTemperature = $beforeTemperature.text();
      cy.get('.day-container:nth-child(4) .weather-list-item:nth-child(2)').click();
      cy.get('.current-weather .current-temperature').then(($afterTemperature) => {
        expect(beforeTemperature).not.to.eq($afterTemperature.text());
      })
    })
  });

  it('when clicking link to city view, redirect is triggered', () => {

    cy.visit('http://localhost:3000');
    cy.get('.App-menu').click();
    cy.location('pathname').should('include', 'list');

  });

  it('when mocking network and api returns specific data, page shows correct information', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(window) {
        cy.stub(window, 'fetch', () => {
          return new Promise(resolve => resolve({
            json: () => ({
              city: { name: 'test' },
              list: [
                {"dt":1551808800,"main":{"temp":-10,"temp_min":-7.64,"temp_max":-6.37,"pressure":1003.04,"sea_level":1003.04,"grnd_level":997.85,"humidity":67,"temp_kf":-1.27},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":2.94,"deg":7.5004},"snow":{"3h":0.012},"sys":{"pod":"n"},"dt_txt":"2019-03-05 18:00:00"},
              {"dt":1551819600,"main":{"temp":9,"temp_min":-9.24,"temp_max":-8.29,"pressure":1005.82,"sea_level":1005.82,"grnd_level":1000.68,"humidity":73,"temp_kf":-0.95},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":20},"wind":{"speed":1.96,"deg":337.5},"snow":{"3h":0.003},"sys":{"pod":"n"},"dt_txt":"2019-03-05 21:00:00"},
              {"dt":1551830400,"main":{"temp":-20.52,"temp_min":-10.14,"temp_max":-9.51,"pressure":1007.73,"sea_level":1007.73,"grnd_level":1002.51,"humidity":76,"temp_kf":-0.64},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":44},"wind":{"speed":1.16,"deg":300.503},"snow":{"3h":0.01},"sys":{"pod":"n"},"dt_txt":"2019-03-06 00:00:00"},
              {"dt":1551841200,"main":{"temp":20.49,"temp_min":-9.54,"temp_max":-9.23,"pressure":1008.39,"sea_level":1008.39,"grnd_level":1003.17,"humidity":69,"temp_kf":-0.32},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":36},"wind":{"speed":1.07,"deg":232},"snow":{},"sys":{"pod":"n"},"dt_txt":"2019-03-06 03:00:00"}],
            }),
            status: 200,
            ok: true,
          }));
        });
      }
    });
    cy.get('.App-header').contains('test');
    cy.get('.current-temperature').contains('-10');
  })
});
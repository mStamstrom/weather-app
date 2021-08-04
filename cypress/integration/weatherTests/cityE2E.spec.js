describe('weather e2e tests', () => {
  it('On load cities from local storage should be loaded', () => {
    cy.visit('http://localhost:3000/weather-app/list', {
      onBeforeLoad(window) {
        window.localStorage.setItem('weather-cities', '[{"id":2673730,"name":"stockholm"},{"id":2174003,"name":"brisbane"}]')
      }});
      cy.contains('Stockholm');
      cy.contains('Brisbane');
  });
  it('when typing new city and press enter the new city should appear in the list', () => {
    cy.visit('http://localhost:3000/weather-app/list');
    const input = cy.get('.add-city').find('[type="text"]');
    input.type('london');
    input.type('{enter}');
    cy.contains('London');
  });
  it('when typing new city and click add button new city should appear in the list', () => {
    const response = '{"coord":{"lon":-3.7026,"lat":40.4165},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":29.03,"feels_like":27.65,"temp_min":26.23,"temp_max":30.24,"pressure":1019,"humidity":25},"visibility":10000,"wind":{"speed":2.24,"deg":270,"gust":2.68},"clouds":{"all":0},"dt":1626357765,"sys":{"type":2,"id":2007545,"country":"ES","sunrise":1626325033,"sunset":1626378235},"timezone":7200,"id":3117735,"name":"testson","cod":200}';
    cy.intercept('https://api.openweathermap.org/data/2.5/weather?q=testson&appid=794fd1eb804018f71fb274449e212c02&units=metric', response);
    cy.visit('http://localhost:3000/weather-app/list');
    cy.get('.add-city').find('[type="text"]').type('testson');
    cy.get('.add-city').find('button').click();
    cy.contains('testson');
  });
  it('when trying to add already existing city error message should appear', () => {
    cy.visit('http://localhost:3000/weather-app/list', {
      onBeforeLoad(window) {
        window.localStorage.setItem('weather-cities', '[{"id":2673730,"name":"stockholm"},{"id":2174003,"name":"brisbane"}]')
      }});
      cy.contains('Stockholm');
      const input = cy.get('.add-city').find('[type="text"]');
      input.type('Stockholm');
      input.type('{enter}');
      cy.get('.error').contains('City already exists');

  });
  it('when selecting city from list, user should be routed to weather view with correct city', () => {
    cy.visit('http://localhost:3000/weather-app/list', {
      onBeforeLoad(window) {
        window.localStorage.setItem('weather-cities', '[{"id":2673730,"name":"stockholm"},{"id":2174003,"name":"brisbane"}]')
      }});
    cy.get('.App-cities a:nth-child(4)').click();
    cy.location('pathname').should('include', 'city/2174003');
    cy.contains('Brisbane');
  });
  it('when pressing remove button city should disapear from list', () => {
    cy.visit('http://localhost:3000/weather-app/list', {
      onBeforeLoad(window) {
        window.localStorage.setItem('weather-cities', '[{"id":2673730,"name":"stockholm"},{"id":2174003,"name":"brisbane"}]')
      }});
      cy.get('.App-cities a:nth-child(4) button').click();
      cy.get('.App-cities a:nth-child(4)').should('not.exist');
  });
});
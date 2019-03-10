describe('weather e2e tests', () => {
  it('On load cities from local storage should be loaded', () => {
    cy.visit('http://localhost:3000/list', {
      onBeforeLoad(window) {
        window.localStorage.setItem('weather-cities', '[{"id":2673730,"name":"stockholm"},{"id":2174003,"name":"brisbane"}]')
      }});
      cy.contains('Stockholm');
      cy.contains('Brisbane');
  });
  it('when typing new city and press enter the new city should appear in the list', () => {
    cy.visit('http://localhost:3000/list');
    const input = cy.get('.add-city').find('[type="text"]');
    input.type('london');
    input.type('{enter}');
    cy.contains('London');
  });
  it('when typing new city and click add button new city should appear in the list', () => {
    cy.visit('http://localhost:3000/list');
    cy.get('.add-city').find('[type="text"]').type('madrid');
    cy.get('.add-city').find('button').click();
    cy.contains('Madrid');
  });
  it('when trying to add already existing city error message should appear', () => {
    cy.visit('http://localhost:3000/list', {
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
    cy.visit('http://localhost:3000/list', {
      onBeforeLoad(window) {
        window.localStorage.setItem('weather-cities', '[{"id":2673730,"name":"stockholm"},{"id":2174003,"name":"brisbane"}]')
      }});
    cy.get('.App-cities a:nth-child(4)').click();
    cy.location('pathname').should('include', 'city/2174003');
    cy.contains('Brisbane');
  });
  it('when pressing remove button city should disapear from list', () => {
    cy.visit('http://localhost:3000/list', {
      onBeforeLoad(window) {
        window.localStorage.setItem('weather-cities', '[{"id":2673730,"name":"stockholm"},{"id":2174003,"name":"brisbane"}]')
      }});
      cy.get('.App-cities a:nth-child(4) button').click();
      cy.get('.App-cities a:nth-child(4)').should('not.exist');
  });
});
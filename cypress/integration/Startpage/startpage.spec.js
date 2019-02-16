describe('startPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/city/2666219');
  });
  it('show title', () => {
    cy.get('.App-title').then((text) => {
      expect(text.length).to.be.above(0);
    });
  });
  it('Check that temperature is showing', () => {
    cy.get('.current-weather');
  })
  it('when selecting future weather current weather should be updated', () => {
    cy.get('#current-temperature .temperature').then((text1) => {
      // cy.get('.weather-list-item:nth-child(4)').click();
      cy.get('#current-temperature .temperature').then((text2) => {
        expect(text1).not.to.eq(text2);
      })
    })
  });
});
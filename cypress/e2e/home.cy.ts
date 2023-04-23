import URL_JSON from '../fixtures/example.json';

describe('When user visit homepage', () => {
  beforeEach(() => {
    cy.fixture('example.json').as('inputData');
    cy.visit('/');
  });
  it('user can see a empty input can type url,  a disabled button and a result div', () => {
    cy.get('input').should('be.empty');
    cy.get('button').should('be.disabled');
    cy.get('[data-testid="result"]').should(
      'have.text',
      'Get your tiny url here'
    );
  });

  it('user can type valid url and click generate button, then user can see the tiny url in the result div', () => {
    cy.get('input').type(URL_JSON.url_success_case);
    cy.get('button').click();
    cy.get('[data-testid="result"]').contains(Cypress.config().baseUrl, {
      timeout: 10000,
    });
  });

  it('if user type invalid url and click generate button, then user can see the error message in the result div', () => {
    cy.get('input').type(URL_JSON.url_fail_case);
    cy.get('button').click();
    cy.get('[data-testid="result"]').contains('url must be a valid URL');
  });
});

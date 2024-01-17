//locators
const pageHeader = 'div[class*="page-header"] h3';
const activeStep = '.rez-nav .active';
const globeLogo = '[alt="GlobeCar Logo"]';

//commands
Cypress.Commands.add('verifyCorrectUrlIsDisplayed', (url) => {
    cy.url().should('include', url);
    cy.get(globeLogo).should('be.visible');
});

Cypress.Commands.add('verifyActiveStepIsDisplayed', (stepText) => {
    cy.get(activeStep).should('have.text', stepText);
});

Cypress.Commands.add('verifyHeaderTextIsDisplayed', (headerText) => {
    cy.get(pageHeader).should('have.text', headerText);
});
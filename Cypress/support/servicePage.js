const departplace = '[class*="search-results"] tbody tr td';
const cancleButton = '#exitButton';

Cypress.Commands.add('verifyThatdepartPlaceOnServicePage', (departPlace) => {
    cy.get(departplace).eq(1).should('be.exist').should('be.visible').should('have.text', departPlace);
})
Cypress.Commands.add('verifyThatArrivalPlaceOnServicePage', (arrivalPlace) => {
    cy.get(departplace).eq(2).should('be.exist').should('be.visible').should('have.text', arrivalPlace);
})
Cypress.Commands.add('clickOnCancelButton', () => {
    cy.get(cancleButton).should('be.exist').should('be.visible').click()
})



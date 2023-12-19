
const pageHeader = '[class="navbar-brand"]';
const fromInputFiled = '[title="From "]';
const toInputFiled = '#arrival-date';
const departDate = '[name="departDate"]';
const fromdropdown = '[class="typeahead dropdown-menu"] a';
const dropdown = '[class="typeahead dropdown-menu"] a';
const currentDay  = '[class*="day--today"]';
const returnDate= '[name="returnDate"]';
const submitButton ='[value="Submit »"]';

const getFullDate = {
    getCurrentDate: () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const day = String(today.getDate()).padStart(2, '0');
      return [year, month, day];
    },
  };

Cypress.Commands.add('verifyCorrectUrlIsDisplayed', (url) => {
    cy.url().should('include', url);
    cy.get(pageHeader).should('be.visible');
});

Cypress.Commands.add('selectFromPlace', (area) => {
    cy.get(fromInputFiled).should('be.exist').should('be.visible')
    cy.get(fromInputFiled).should('be.exist').should('be.visible').clear().type(area).should('have.value', area);
    cy.get(fromdropdown).should('be.exist').should('be.visible').click()
});
Cypress.Commands.add('selectToplace', (area) => {
    cy.get(toInputFiled).should('be.exist').should('be.visible')
    cy.get(toInputFiled).should('be.exist').should('be.visible').clear().type(area).should('have.value', area);
    cy.get(fromdropdown).eq(1).should('be.exist').should('be.visible').click()
});
Cypress.Commands.add('selectdepartDate', () => {
    
    const currentFullDate = getFullDate.getCurrentDate();
    const currentDate = parseInt(currentFullDate[2], 10);
    const currentMonth = currentFullDate[1];

    const lastDayOfMonth = new Date(currentFullDate[0], currentMonth, 0).getDate();

    const reqdate5 = Math.min(currentDate + 5, lastDayOfMonth);
    var date = new Date(2000, currentMonth - 1, reqdate5);
    var monthName5 = date.toLocaleString('en-US', { month: 'long' });
    const fulldate5 = reqdate5 + " " + monthName5 + ", " + currentFullDate[0];
    cy.log(fulldate5);
 cy.get(returnDate).should('be.visible').click({ force: true })
    cy.get(returnDate).next('.picker.picker--focused.picker--opened').contains(reqdate5).should('exist').click({ force: true })
   
});


Cypress.Commands.add('selectReturnDate', (date) => {
    cy.get(returnDate).should('be.exist').should('be.visible')
    cy.get(returnDate).should('be.exist').should('be.visible').clear().type(comboiosDePortugal.getfeatureDay(date));
});
Cypress.Commands.add('clickOnSubmitButton', () => {
    cy.get(submitButton).should('be.visible').click();
    // cy.reload()
});

Cypress.Commands.add('verifyThatFormPlaceDisplayed', (fromPlace) => {
    cy.get(fromInputFiled).eq(2).should('be.exist').should('be.visible').should('have.value', fromPlace);
    
})

Cypress.Commands.add('verifyThatToPlaceDisplayed', (ToPlace) => {
    cy.get(fromInputFiled).eq(2).should('be.exist').should('be.visible').should('have.value', ToPlace);
    
})

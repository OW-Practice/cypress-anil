
import * as userTestData from '../fixtures/dataStore.json';

describe('comboios-De-Portugal', () => {
    let userTestDataa;
    beforeEach(() => {
        cy.fixture('dataStore').then((data) => {
            userTestDataa = data;
        });
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.visit(userTestData.Credentials.url);
    })
    it(`train search details are saved  when click on cancel button on service page`, function () {
        cy.verifyCorrectUrlIsDisplayed(userTestData.Credentials.url);
        cy.selectFromPlace(userTestData.locations.fromPlace)
        cy.selectToplace(userTestData.locations.toPlace)
        cy.selectDepartDate()
        cy.selectToDate()
        cy.clickOnSubmitButton()
        cy.verifyThatdepartPlaceOnServicePage(userTestData.locations.fromPlace)
        cy.verifyThatArrivalPlaceOnServicePage(userTestData.locations.fromPlace)
        cy.clickOnCancleButton()
        cy.verifyCorrectUrlIsDisplayed(userTestData.Credentials.url);
        cy.verifyThatFormPlaceDisplayed(userTestData.locations.fromPlace)
        cy.verifyThatToPlaceDisplayed(userTestData.locations.fromPlace)
    })
})
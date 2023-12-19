
import * as userTestData from '../fixtures/dataStore.json';

describe('ComboiosDePortugal', () => {
    
var userTestDataa;
    beforeEach(() => {
        cy.fixture('dataStore').then((data) => {
            userTestDataa = data;
        });
        
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.visit(userTestData.Credentials.url);
    })

    it(`Train Search Details are saved  when Click on cancle button on service page`, function () {
        
        cy.verifyCorrectUrlIsDisplayed(userTestData.Credentials.url);
        cy.selectFromPlace(userTestData.Credentials.fromPlace)
        cy.selectToplace(userTestData.Credentials.toPlace)
        cy.selectdepartDate()
        cy.clickOnSubmitButton()

        cy.verifyThatdepartPlaceOnServicePage(userTestData.Credentials.fromPlace)
        cy.verifyThatArrivalPlaceOnServicePage(userTestData.Credentials.toPlace)
        cy.clickOnCancleButton()

        cy.verifyCorrectUrlIsDisplayed(userTestData.Credentials.url);
        cy.verifyThatFormPlaceDisplayed(userTestData.Credentials.fromPlace)
        cy.verifyThatToPlaceDisplayed(userTestData.Credentials.toPlace)
    })

})
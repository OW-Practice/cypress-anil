///<reference types="cypress"/>

import LoginPage from '../pages/loginPage';   // page object
import hom from '../pages/HomePage'
import FoliosPages from '../pages/FoliosPage';
const data = require("../fixtures/TestData.json")




describe('login funtionality', () => {

const loginPage = new LoginPage()  
const homePage = new hom()
const folioPage = new FoliosPages()

  before(() => {
    cy.clearLocalStorage()
    cy.viewport(1280, 800);
     cy.visit(data.AccountCreaion.url)    
     
})

  it('login with vaild Credentails ', () => {
    loginPage.enterEmail(data.AccountCreaion.username);
    loginPage.enterPassword(data.AccountCreaion.password)
    loginPage.clickOnLogInButton()
    cy.wait(10000)
    homePage.verifyThatLeftSideMenuIsDisplayed()
    homePage.verifyThatprofilePictureIsDisplayed()
    
    folioPage.clickonFoliosMenu()
    folioPage.clickOnFoliosViewDropdown()
    folioPage.clickOnPlusIcon()
    folioPage.clickOnAccountOption()
    folioPage.verifyThatAccoutCreationFormDisplayed()
    folioPage.enterAccountName('FolioAccountqwerty')
    folioPage.enterAccountNumber('1143')
    folioPage.clickOnOkButton()

  })
})


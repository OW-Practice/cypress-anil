import loginPageLoc from '../locators/loginPageLocators'

export default class LoginPage{

    enterEmail(mail){
        cy.get(loginPageLoc.email).clear().type(mail).should('have.value',mail)
    }
    enterPassword(password){
        cy.get(loginPageLoc.passswd).clear().type(password).should('have.value',password)
    }
    clickOnLogInButton(){
        cy.get(loginPageLoc.loginButton).click()
    }
}

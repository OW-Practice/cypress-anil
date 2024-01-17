//locators
const registerToggle = '[href="/en/register"]';
const VerifyRegisterMainHeader = 'div h1';
const verifyRegisterheader = '[class="input-box"] h3';
const registerFirstName = '[formcontrolname="firstName"]';
const registerlastName = '[formcontrolname="lastName"]';
const registerEmail = '[formcontrolname="email"]'
const registerConfEmail = '[formcontrolname="confEmail"]';
const registerPassword = '[formcontrolname="password"]';
const registerConfPassword = '[formcontrolname="confPassword"]';
const registerCountry = 'div .tel-ddl-country';
const registerSelectCountry = '[role="option"]';
const registerMobileNumber = '[autocomplete="tel-national"]';
const registerBtn = 'button[type="submit"]';

//commands
Cypress.Commands.add('clickOnRegisterHeader', () => {
    cy.get(registerToggle).should('be.visible').and('exist').click();
});

Cypress.Commands.add('verifyPageHeaders', (headerName) => {
    cy.get(verifyRegisterheader).contains(headerName, { matchCase: false }).should('exist');
});

Cypress.Commands.add('enterFirstNameDetails', (fname) => {
    cy.get(registerFirstName).should('be.visible').and('exist');
    cy.get(registerFirstName).type(fname).should('have.value', fname);
});

Cypress.Commands.add('enterlastNameDetails', (lname) => {
    cy.get(registerlastName).should('be.visible').and('exist');
    cy.get(registerlastName).type(lname).should('have.value', lname);
});

Cypress.Commands.add('enterEmailDetails', (email) => {
    cy.get(registerEmail).should('be.visible').and('exist');
    cy.get(registerEmail).clear().type(email).should('have.value', email);
});

Cypress.Commands.add('enterConfirmEmailDetails', (confEmail) => {
    cy.get(registerConfEmail).should('be.visible').and('exist');
    cy.get(registerConfEmail).clear().type(confEmail).should('have.value', confEmail);
});

Cypress.Commands.add('enterRegisteredPassword', (passwd) => {
    cy.get(registerPassword).should('be.visible').and('exist');
    cy.get(registerPassword).clear().type(passwd).should('have.value', passwd);
});

Cypress.Commands.add('enterConfirmPassword', (confPasswd) => {
    cy.get(registerConfPassword).should('be.visible').and('exist');
    cy.get(registerConfPassword).clear().type(confPasswd).should('have.value', confPasswd);
});

Cypress.Commands.add('enterCountryName', (cName) => {
    cy.get(registerCountry).should('be.visible').click();
    cy.get(registerSelectCountry).contains(cName).click();
});

Cypress.Commands.add('enterRegisterMobileNumber', (mobileNumber) => {
    const number = mobileNumber.split('-')[1];
    cy.get(registerMobileNumber).should('be.visible').and('exist');
    cy.get(registerMobileNumber).clear().type(number).should('have.value', number);
});

Cypress.Commands.add('clickOnRegisterButton', () => {
    cy.get(registerBtn).should('not.be.disabled').and('be.visible').click();
});

Cypress.Commands.add('registerUsingAPI', (email, firstName, lastName, password, mobileNumber) => {
    cy.request({
        method: 'POST',
        url: 'https://api.globecar.com/v1/account/5c394297c2bcc2692e330cd9/register?lang=en',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "phoneNumber": mobileNumber
        })
    }).then((response) => {
        const dataResponse = response.body.data;
        expect(response.status).to.be.eq(200);
        const usrId = dataResponse.userId;
        cy.wrap(usrId).as('id');
    })
});

Cypress.Commands.add('deleteApi', (password) => {
    cy.request({
        method: 'POST',
        url: 'https://api.globecar.com/v1/account/5c394297c2bcc2692e330cd9/Delete',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
        })
    }).then((response) => {
        expect(response.status).to.be.eq(200);
    })
});
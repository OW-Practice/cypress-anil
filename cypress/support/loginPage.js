import timeOuts from "../utilities/timeOuts";

//locators
const headerText = '.login-dialog h4';
const emailAddressLabel = '[name="email"] + span label';
const emailInputField = '.input-box [name="email"]';
const passwordLabel = '[name="password"] + span label';
const passwordInputField = '.input-box [name="password"]';
const loginButton = '.input-box button.btn-main';
const loginDialog = '[id^="mat-dialog"] .login-dialog';
const registeredName = '[data-toggle="dropdown"]';
const logoutBtn = '[onclick="return false;"]';
const errorMessage = '[class="errors ng-star-inserted"]'
const forgotPasswd = '[href="/en/forgot-password"]';
const email = '[formcontrolname="email"]';
const continueBtn = 'button[type="submit"]';
const loginToggle = '[href="/en/login"]';
const profileBtn = '[href="/en/my-profile"]';
const profileHeader = 'div h3';
const profilePageHeaders = 'div h4';
const profilePasswd = '[name="password"]';
const closeAccountMessage = 'span.mat-list-text';

//commands
Cypress.Commands.add('verifyLoginPopupIsDisplayed', (emailId) => {
    return cy.request({
        method: 'POST',
        url: 'https://api.globecar.com/v1/account/5c394297c2bcc2692e330cd9/IsUserRegistered',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, */*'
        },
        body: JSON.stringify({
            "userName": `${emailId}`
        })
    }).then((response) => {
        const value = response.body.data;
        return value;
    })
});

Cypress.Commands.add('verifyHeaderText', () => {
    cy.get(loginDialog).should('be.exist').should('be.visible');
    cy.get(headerText).should('be.exist').should('be.visible').should('have.text', 'LOG IN TO YOUR GLOBECAR ACCOUNT');
});

Cypress.Commands.add('enterEmailAddress', (email) => {
    cy.get(emailAddressLabel).should('be.exist').should('be.visible').should('contain.text', 'Email address');
    cy.get(emailInputField).should('be.exist').should('be.visible').clear().type(email).should('have.value', email);
});

Cypress.Commands.add('enterPassword', (pass) => {
    cy.get(passwordInputField).should('be.exist').click({ force: true });
    cy.get(passwordLabel).should('be.exist').should('contain.text', 'Password');
    cy.get(passwordInputField).should('be.exist').clear().type(pass).should('have.value', pass);
});

Cypress.Commands.add('clickLoginButton', () => {
    cy.get(loginButton).should('be.exist').should('be.visible').should('contain.text', 'LOG IN').click({ multiple: true });
    cy.wait(timeOuts.longWait);
});

Cypress.Commands.add('continueGuestOrLogin', (value) => {
    const name = value.toLowerCase();
    if (name.includes('guest')) {
        cy.get(loginButton).should('be.exist').should('be.visible').should('contain.text', 'CONTINUE AS A GUEST').click({ multiple: true, force: true });
        cy.wait(timeOuts.longWait);
    } else {
        cy.clickLoginButton();
    }
});

Cypress.Commands.add('verifyRegisterAccount', (regdId) => {
    cy.wait(timeOuts.veryLongWait)
    cy.get(registeredName).contains(regdId);
});

Cypress.Commands.add('clickOnLogout', (regdId) => {
    cy.get(registeredName).contains(regdId).click();
    cy.get(logoutBtn).should('be.visible').click();
});

Cypress.Commands.add('verifyErrorMessageForWrongPassword', () => {
    cy.get(errorMessage).contains(' Validation Errors: ', { matchCase: false });
    cy.get(errorMessage).contains('Invalid email or password. Try again or click "Forgotten your password?" to reset your password.', { matchCase: false });
});

Cypress.Commands.add('clickOnForgotPassword', () => {
    cy.get(forgotPasswd).should('exist').click();
});

Cypress.Commands.add('enterEmailToGetResetLink', (mail) => {
    cy.get(email).clear().type(mail).should('have.value', mail);
    cy.get(continueBtn).should('not.be.disabled').and('be.visible').click();
});

Cypress.Commands.add('clickOnResetPasswordBtn', () => {
    cy.get(continueBtn).should('not.be.disabled').and('be.visible').click();
});

Cypress.Commands.add('clickOnLoginToggleBtn', () => {
    cy.get(loginToggle).should('exist').click();
});

Cypress.Commands.add('verifyProfileHeader', (regdId) => {
    cy.get(registeredName).contains(regdId).click();
    cy.get(profileBtn).should('exist').click();
});

Cypress.Commands.add('verifyProfilePage', () => {
    cy.get(profileHeader).should('exist').contains('MY PROFILE:');
    cy.get(profilePageHeaders).should('exist').contains("Driver's name and birth date");
    cy.get(profilePageHeaders).should('exist').contains("Driver's license ");
    cy.get(profilePageHeaders).should('exist').contains('Address');
    cy.get(profilePageHeaders).should('exist').contains('Contact Details');
    cy.get(profilePageHeaders).should('exist').contains('Signup to our email newsletter');
    cy.get(continueBtn).should('not.be.disabled').and('be.visible');
});

Cypress.Commands.add('clickOnCloseAccountButton', () => {
    cy.get(continueBtn).should('not.be.disabled').and('be.visible').contains('Close my account ').click();
});

Cypress.Commands.add('closeAccount', (confPasswd) => {
    cy.get(continueBtn).should('not.be.disabled').and('be.visible').contains('YES').click();
    cy.get(profilePageHeaders).should('exist').contains('Confirm');
    cy.get(profilePasswd).clear().type(confPasswd).should('have.value', confPasswd);
    cy.get(continueBtn).should('not.be.disabled').and('be.visible').contains('OK').click();
    cy.get(closeAccountMessage).should('exist').contains('Your account has been closed successfully!');
});

Cypress.Commands.add('loginApiUrl', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'https://api.globecar.com/v1/account/5c394297c2bcc2692e330cd9/token?lang=en',
        headers: {
            "content-type": "application/json"
        },
        form: true,
        body: {
            'username': email,
            'password': password,
            'grant_type': 'password',
            'client_id': '5b43d83eda14916fd95fa82e'
        }
    }).then((response) => {
        expect(response.status).to.be.eq(200);
    })
});
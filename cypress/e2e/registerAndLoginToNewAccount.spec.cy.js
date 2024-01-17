/// <reference types= "cypress" />
import { faker } from "@faker-js/faker";
import * as userTestData from '../fixtures/userTestData.json';
import * as timeOuts from '../utilities/timeOuts';

describe('GlobeCar application', () => {
    let testData, fName, lName, email, wrongPassword, wrongEmail;
    const [firstName, lastName, emailAddress] = Object.values(userTestData.data);
    const [countryName] = Object.values(userTestData.widgetData);

    const environment = Cypress.env('url') || 'prod';
    const { url } = Cypress.env('login_creds')[environment];
    const deviceType = Cypress.env('DEVICE_TYPE') || userTestData.loginDetails.viewport;
    const password = userTestData.loginDetails.password;
    const phoneNumber = userTestData.loginDetails.alternateNumber;

    beforeEach(() => {
        cy.fixture('dataStore').then((data) => {
            testData = data;
        });
        cy.setViewportBasedOnDevice(deviceType);
        cy.visit(url);
        /**
         * This block is to skip the load event issue in open mode cypress
         */
        if (window.navigator && navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((registration) => {
                    registration.unregister();
                });
            });
        }

        const randomNum = faker.number.int({ min: 100, max: 999 });
        fName = `${firstName} ` + faker.number.int({ min: 100, max: 999 });
        lName = `${lastName}` + faker.number.int({ min: 100, max: 999 });
        email = emailAddress.replace("cypress", `cypress${randomNum}`);
        wrongPassword = faker.internet.password() + randomNum;
        wrongEmail = faker.internet.email();

    })

    it(`C237: should register and validate the new account then logout in ${deviceType} view`, () => {
        cy.verifyCorrectUrlIsDisplayed(url);
        cy.verifyActiveStepIsDisplayed(testData.steps.vehicleSelection);
        cy.verifyHeaderTextIsDisplayed(testData.headers.rentingHeader);
        cy.screenshot('section-1', { capture: 'fullPage', overwrite: true });

        cy.clickOnRegisterHeader();
        cy.verifyCorrectUrlIsDisplayed(testData.urlParams.registration);
        cy.verifyPageHeaders('Sign up to a FREE GlobeCar account');
        cy.screenshot('before_registration', { capture: 'fullPage', overwrite: true });

        cy.enterFirstNameDetails(fName);
        cy.enterlastNameDetails(lName);

        cy.enterEmailDetails(email);
        cy.enterConfirmEmailDetails(email);

        cy.enterRegisteredPassword(password);
        cy.enterConfirmPassword(password);

        cy.enterCountryName(countryName);
        cy.enterRegisterMobileNumber(phoneNumber);
        cy.screenshot('after_registration', { capture: 'fullPage', overwrite: true });

        cy.clickOnRegisterButton();
        cy.verifyRegisterAccount(fName);
        cy.screenshot('verify_registration', { capture: 'fullPage', overwrite: true });

        cy.clickOnLogout(fName);
    })

    it(`C240: should login to created account in ${deviceType} view`, () => {
        cy.verifyCorrectUrlIsDisplayed(url);
        cy.verifyActiveStepIsDisplayed(testData.steps.vehicleSelection);
        cy.verifyHeaderTextIsDisplayed(testData.headers.rentingHeader);
        cy.screenshot('after_login_in_new_account', { capture: 'fullPage', overwrite: true });

        //registering a new account
        cy.registerUsingAPI(email, firstName, lastName, password, phoneNumber);

        //login with invalid password and validating it 
        cy.clickOnLoginToggleBtn();
        cy.verifyCorrectUrlIsDisplayed(testData.urlParams.login);
        cy.enterEmailAddress(email);
        cy.enterRegisteredPassword(wrongPassword);
        cy.clickLoginButton();
        cy.verifyErrorMessageForWrongPassword()

        //login with invalid email and validating it 
        cy.enterEmailAddress(wrongEmail);
        cy.enterRegisteredPassword(password);
        cy.clickLoginButton();

        //login with valid credentials 
        cy.enterEmailAddress(email);
        cy.enterRegisteredPassword(password);
        cy.screenshot('before_login_to_new_account', { capture: 'fullPage', overwrite: true });

        cy.clickLoginButton();
        cy.verifyRegisterAccount(fName);
        cy.screenshot('after_login_to_new_account', { capture: 'fullPage', overwrite: true });

        cy.clickOnLogout(fName);
    })

    it(`should reset password in ${deviceType} view`, () => {
        cy.verifyCorrectUrlIsDisplayed(url);
        cy.verifyActiveStepIsDisplayed(testData.steps.vehicleSelection);
        cy.verifyHeaderTextIsDisplayed(testData.headers.rentingHeader);
        cy.screenshot('section-1', { capture: 'fullPage', overwrite: true });

        //registering a new account
        cy.registerUsingAPI(email, firstName, lastName, password, phoneNumber);

        cy.clickOnLoginToggleBtn();
        cy.verifyCorrectUrlIsDisplayed(testData.urlParams.login);
        cy.screenshot('before_login_in_to_account_in_reset_password', { capture: 'fullPage', overwrite: true });

        //login with invalid credentials and validating it 
        cy.enterEmailAddress(email);
        cy.enterRegisteredPassword(wrongPassword);
        cy.screenshot('after_entering_data_in_login_in_reset_password', { capture: 'fullPage', overwrite: true });

        cy.clickLoginButton();
        cy.verifyErrorMessageForWrongPassword();
        cy.clickOnForgotPassword();
        cy.verifyCorrectUrlIsDisplayed(testData.urlParams.forgotPassword);
        cy.screenshot('forget_password_page_in_reset_password', { capture: 'fullPage', overwrite: true });

        cy.enterEmailToGetResetLink(email);
        cy.getResetEmailPasswordLink("cypress/utilities/resetPassword.js", email).then((url) => {
            const stringifyData = JSON.stringify(url);
            const parsedData = JSON.parse(stringifyData);
            const forgotPasswordUrl = parsedData.stdout;
            cy.visit(forgotPasswordUrl);
            cy.wait(timeOuts.veryShortWait);
        });

        //login with valid credentials
        cy.verifyCorrectUrlIsDisplayed(testData.urlParams.passwordReset);
        cy.verifyPageHeaders('RESET YOUR PASSWORD');
        cy.enterRegisteredPassword(password);
        cy.enterConfirmPassword(password);

        cy.screenshot('after_entering_new_password_in_reset_password', { capture: 'fullPage', overwrite: true });
        cy.clickOnResetPasswordBtn();

        cy.enterEmailAddress(email);
        cy.enterRegisteredPassword(password);
        cy.screenshot('after_entering_credentials_in_reset_password', { capture: 'fullPage', overwrite: true });

        cy.clickLoginButton();
    })

    it(`C286: should cancel the created account ${deviceType} view`, () => {
        cy.verifyCorrectUrlIsDisplayed(url);
        cy.verifyActiveStepIsDisplayed(testData.steps.vehicleSelection);
        cy.verifyHeaderTextIsDisplayed(testData.headers.rentingHeader);
        cy.screenshot('section-1_after_login_in_close_account', { capture: 'fullPage', overwrite: true });

        //registering a new account
        cy.registerUsingAPI(email, firstName, lastName, password, phoneNumber)

        //login with invalid credentials and validating it 
        cy.clickOnLoginToggleBtn();
        cy.verifyCorrectUrlIsDisplayed(testData.urlParams.login);
        cy.screenshot('section-1_before_entering_data_in_close_account', { capture: 'fullPage', overwrite: true });

        cy.enterEmailAddress(email);
        cy.enterRegisteredPassword(wrongPassword);
        cy.clickLoginButton();
        cy.verifyErrorMessageForWrongPassword();

        //login with valid credentials
        cy.enterEmailAddress(email);
        cy.enterRegisteredPassword(password);
        cy.screenshot('section-1_after_entering_data_in_close_account', { capture: 'fullPage', overwrite: true });

        cy.clickLoginButton();

        //deleting an account
        cy.screenshot('section-1_after_entering_user_page_in_close_account', { capture: 'fullPage', overwrite: true });
        cy.clickOnLoginToggleBtn();
        cy.verifyProfileHeader(firstName);
        cy.verifyCorrectUrlIsDisplayed(testData.urlParams.myProfile);
        cy.verifyProfilePage();
        cy.screenshot('section-1_after_entering_profile_page_in_close_account', { capture: 'fullPage', overwrite: true });

        cy.clickOnCloseAccountButton();
        cy.closeAccount(password);
        cy.screenshot('section-1_after_deleting_account_in_close_account', { capture: 'fullPage', overwrite: true });
    })
})
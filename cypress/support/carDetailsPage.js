import timeOuts from '../utilities/timeOuts';

//locators
const verifyCarsList = '.listing .car-rate';
const verifyCarsListDetails = '.listing .car-rate .car-details';
const verifyCarsListStartingCol = '.listing .car-rate .car-price';
const carName = 'div.car-details h4';
const totalPrice = 'p.car-price-total';
const bookNowButton = '.car-rate-outer button';
const vehicleSubTotal = 'span[class*=subtotal]';
const continueButton = '[type="submit"]';
const firstNameField = '[name="fname"]';
const lastNameField = '[name="lname"]';
const emailAddressField = '.row [name="email"]';
const confirmEmailAddressField = '[formcontrolname="confEmail"]';
const mobilePhone = '.tel-input [name="phone"]';
const cardNumberField = '[name="cardnumber"]';
const expirationMonthField = '[formcontrolname="ccExpMonth"]';
const expirationYearField = '[formcontrolname="ccExpYear"]';
const confirmationCheckbox = '[formctrlname="isReceiveSMS"] [type="checkbox"]';
const cvvField = '[name="cvc"]';
const commentsFieldCheckbox = '.comments [type="checkbox"]';
const commentsInputField = '[formcontrolname="custComments"]';
const termsAndConditionsCheckbox = '[formctrlname="acceptTerms"] [type="checkbox"]';
const classTypes = '.car-size';
const countryCodeDropdown = '.tel-ddl-country .mat-form-field-flex';
const countriesList = '[role="listbox"]';
const countryNames = '[role="listbox"] .mat-option';
const rentingPagePrice = 'div.starting-at-col h3';
const dayPrice = '.price-block h3';
const signUpLetter = 'div.newslettersignup';
const signUpLetterCheckbox = '.newslettersignup input';
const loginDetailsInStep3 = '.box.login';
const guestOrMemberLabel = '.box.login .mat-radio-label-content';
const guestOrMemberCheckbox = '.box.login input';
const onlineCheckInLabel = 'div.save-time .mat-checkbox-label';
const onlineCheckInCheckbox = 'div.save-time [type="checkbox"]';
const address1InputField = '[name="address"]';
const address2InputField = '[formcontrolname="custAddress2"]';
const addressCountryDropdown = '[formcontrolname="custCountry"]';
const addressStateField = '[formcontrolname="custState"]';
const addressCityField = '[name="city"]';
const addressPostalField = '[name="postal"]';
const labelsText = 'div+span[class*="ng-tns"]';
const vehicleCheckbox = '[class="mat-radio-label"]';
const companyName = '[name="company"]';
const headerLabelsText = 'h5[class*="ng-tns"]';
const licenseNumberField = '[formcontrolname="licNumber"]';
const licenseCountryDropdown = '[formcontrolname="licCountry"]';
const licenseStateDropdown = '[formcontrolname="licState"]';
const licenseExpirationDayDropdown = '[formcontrolname="driverLicExpDay"]';
const licenseExpirationMonthDropdown = '[formcontrolname="driverLicExpMonth"]';
const licenseExpirationYearDropdown = '[formcontrolname="driverLicExpYear"]';
const licenseDOBDayDropdown = '[formcontrolname="custDoBDay"]';
const licenseDOBMonthDropdown = '[formcontrolname="custDoBMonth"]';
const licenseDOBYearDropdown = '[formcontrolname="custDoBYear"]';

//commands
Cypress.Commands.add('verifyAtleastThreeCarsListAreDisplayed', () => {
    for (let index = 0; index < 3; index++) {
        cy.get(verifyCarsList).eq(index).should('be.visible');
        cy.get(verifyCarsListDetails).eq(index).should('be.visible');
        cy.get(verifyCarsListStartingCol).eq(index).should('be.visible');
    }
});

Cypress.Commands.add('verifyCarClassTypeIsDisplayed', (classType) => {
    cy.get(classTypes).contains(classType, { matchCase: false });
});

Cypress.Commands.add('clickBookNowForFirstCar', () => {
    cy.get(bookNowButton).eq(0).should('exist').click();
});

Cypress.Commands.add('getCarNameForFirstCar', () => {
    cy.get(carName).eq(0).invoke('text').then(($text) => {
        cy.wrap($text).as('firstCarName');
    });
});

Cypress.Commands.add('getClassTypeForFirstCar', () => {
    cy.get(classTypes).eq(0).invoke('text').as('firstCarClassType');
});

Cypress.Commands.add('getTotalPriceForFirstCar', () => {
    cy.get(totalPrice).invoke('text').then(($price) => {
        const numericPart = $price.match(/\d+\.\d+/);
        const value = parseFloat(numericPart[0]);
        cy.wrap(value).as('firstCarTotalPrice');
        cy.get('@firstCarTotalPrice').should('not.equal', 0);
    });
});

Cypress.Commands.add('verifyCarName', (name) => {
    cy.get(carName).should('have.text', name);
});

Cypress.Commands.add('verifyVehicleSubTotal', (price) => {
    cy.get(vehicleSubTotal).should('contain.text', price);
});

Cypress.Commands.add('clickOnContinue', () => {
    cy.get(continueButton).should('contain.text', 'CONTINUE').click();
});

Cypress.Commands.add('enterDriverDetails', (firstName, lastName, emailAddress) => {
    cy.get(firstNameField).clear().type(firstName).should('have.value', firstName);
    cy.get(lastNameField).clear().type(lastName).should('have.value', lastName);
    cy.get(emailAddressField).clear().type(emailAddress);
    cy.get(confirmEmailAddressField).clear().type(emailAddress);
});

Cypress.Commands.add('selectCountryCode', (index, name) => {
    cy.get(countryCodeDropdown).eq(index).should('be.visible').click();
    cy.get(countriesList).should('be.visible');
    cy.get(countryNames).contains(name, { matchCase: false }).click();
});

Cypress.Commands.add('enterMobileNumber', (index, mobileNumber) => {
    cy.get(mobilePhone).eq(index).should('be.visible').clear().type(mobileNumber).should('have.value', mobileNumber);
});

Cypress.Commands.add('checkConfirmationSmsCheckbox', () => {
    let isChecked = false;
    cy.get(confirmationCheckbox).should('exist').check({ force: true });
    cy.get(confirmationCheckbox).should('be.checked').then(($checkbox) => {
        isChecked = $checkbox.is(':checked');
        return isChecked;
    });
});

Cypress.Commands.add('enterPaymentDetails', (cardnumber, month, year, cvv) => {
    cy.get(cardNumberField).clear().type(cardnumber).should('have.value', cardnumber);
    cy.get(expirationMonthField).select(month).should('contain.text', month);
    cy.get(expirationYearField).select(year).should('contain.text', year);
    cy.get(cvvField).clear().type(cvv).should('have.value', cvv);
});

Cypress.Commands.add('checkCommentsCheckbox', () => {
    let isChecked = false;
    cy.get(commentsFieldCheckbox).should('exist').check({ force: true });
    cy.get(commentsFieldCheckbox).should('be.checked').then(($checkbox) => {
        isChecked = $checkbox.is(':checked');
        return isChecked;
    });
});

Cypress.Commands.add('enterComments', (comments) => {
    cy.get(commentsInputField).type(comments, { force: true }).should('have.value', comments);
});

Cypress.Commands.add('checkTermsAndConditionsCheckbox', () => {
    let isChecked = false;
    cy.get(termsAndConditionsCheckbox).should('exist').check({ force: true });
    cy.get(termsAndConditionsCheckbox).should('be.checked').then(($checkbox) => {
        isChecked = $checkbox.is(':checked');
        return isChecked;
    });
});

Cypress.Commands.add('clickOnBookNow', (email) => {
    cy.get(continueButton).should('contain.text', 'BOOK NOW').click();
    cy.wait(timeOuts.veryLongWait);
});

Cypress.Commands.add('verifyRentingPagePriceisNotZero', () => {
    for (let index = 0; index < 3; index++) {
        cy.get(rentingPagePrice).eq(index).should('be.visible').invoke('text').then(($price) => {
            const numericPart = $price.match(/\d+\.\d+/);
            const value = parseFloat(numericPart[0]);
            cy.wrap(value).should('not.equal', 0);
        });
    }
});

Cypress.Commands.add('verifySelectionPagePriceisNotZero', () => {
    for (let index = 0; index < 3; index++) {
        cy.get(dayPrice).eq(index).should('be.visible').invoke('text').then(($price) => {
            const numericPart = $price.match(/\d+\.\d+/);
            const value = parseFloat(numericPart[0]);
            cy.wrap(value).should('not.equal', 0);
        });
    }
});

Cypress.Commands.add('checkSignUpLetterCheckbox', () => {
    let isChecked = false;
    cy.get(signUpLetter).should('contain.text', 'Signup to our email newsletter');
    cy.get(signUpLetterCheckbox).should('exist').check({ force: true });
    cy.get(signUpLetterCheckbox).should('be.checked').then(($checkbox) => {
        isChecked = $checkbox.is(':checked');
        return isChecked;
    });
});

Cypress.Commands.add('verifyLoginBoxIsDisplayed', () => {
    cy.get(loginDetailsInStep3).should('be.exist').should('be.visible');
});

Cypress.Commands.add('checkGuestOrMemberCheckbox', (checkboxName) => {
    const name = checkboxName.toLowerCase();
    return cy.wrap(null).then(() => {
        if (name.includes('guest')) {
            cy.get(guestOrMemberLabel).should('contain.text', 'Continue as a guest');
            cy.get(guestOrMemberCheckbox).eq(0).should('exist').check({ force: true }).should('be.checked');
            return false;
        } else {
            return cy.get(guestOrMemberLabel).should('contain.text', 'Already a member?').then(() => {
                return cy.get(guestOrMemberCheckbox).eq(1).should('exist').check({ force: true }).should('be.checked').then(($checkbox) => {
                    return $checkbox.is(':checked');
                });
            });
        }
    });
});

Cypress.Commands.add('checkOnlineCheckInCheckbox', () => {
    let isChecked = false;
    cy.get(onlineCheckInLabel).should('be.visible').should('contain.text', 'Online check In - Save time at the counter!');
    cy.get(onlineCheckInCheckbox).should('exist').check({ force: true });
    cy.get(onlineCheckInCheckbox).should('be.checked').then(($checkbox) => {
        isChecked = $checkbox.is(':checked');
        return isChecked;
    });
});

Cypress.Commands.add('enterCheckInAddressDetails', (firstAddress, secondAddress, countryCode, state, city, postalCode) => {
    cy.get(headerLabelsText).contains('Address').should('be.visible');
    cy.get(address1InputField).should('be.visible').type(firstAddress).should('have.value', firstAddress);
    cy.get(address2InputField).should('be.visible').type(secondAddress).should('have.value', secondAddress);
    cy.get(addressCountryDropdown).select(countryCode).should('contain', countryCode);
    cy.get(addressStateField).select(state).should('contain', state);
    cy.get(addressCityField).should('be.visible').type(city).should('have.value', city);
    cy.get(addressPostalField).should('be.visible').type(postalCode).should('have.value', postalCode);
});

Cypress.Commands.add('selectVehicleForWorkCheckbox', (tickCheckbox, cName) => {
    cy.get(labelsText).should('be.visible').should('contain', 'Will you use the vehicle for work?');
    const value = tickCheckbox === true ? 'yes' : 'no';
    if (tickCheckbox) {
        cy.get(vehicleCheckbox).contains(value, { matchCase: false }).click();
        cy.get(companyName).should('be.visible').type(cName).should('have.value', cName);
    } else {
        cy.get(vehicleCheckbox).contains(value, { matchCase: false }).click();
    }
});

Cypress.Commands.add('enterDriversLicenseNumber', (licenseNumber) => {
    cy.get(headerLabelsText).contains("Driver's license").should('be.visible');
    cy.get(licenseNumberField).should('be.visible').type(licenseNumber.toString()).should('have.value', licenseNumber);
});

Cypress.Commands.add('driversPlaceOfIssueDetails', (countryName, state) => {
    cy.get(labelsText).should('be.visible').should('contain.text', 'Place of issue');
    cy.get(licenseCountryDropdown).select(countryName).should('contain.text', countryName);
    if (countryName.includes('Canada') || countryName.includes('United States of America')) {
        cy.get(licenseStateDropdown).select(state).should('contain.text', state);
    } else {
        cy.get(licenseStateDropdown).type(state).should('have.value', state);
    }
});

Cypress.Commands.add('driversExpirationDateDetails', (day, month, year) => {
    cy.get(labelsText).should('be.visible').should('contain.text', 'Expiration date');
    cy.get(licenseExpirationYearDropdown).select(year).should('contain.text', year);
    cy.get(licenseExpirationMonthDropdown).select(month).should('contain.text', month);
    cy.get(licenseExpirationDayDropdown).select(day).should('contain.text', day);
});

Cypress.Commands.add('driversDateOfBirthDetails', (day, month, year) => {
    cy.get(labelsText).should('be.visible').should('contain.text', 'Date of birth');
    cy.get(licenseDOBYearDropdown).select(year).should('contain.text', year);
    cy.get(licenseDOBMonthDropdown).select(month).should('contain.text', month);
    cy.get(licenseDOBDayDropdown).select(day).should('contain.text', day);
});
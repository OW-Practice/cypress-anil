import timeOuts from "../utilities/timeOuts";

//locators
const reservationSuccessMessage = 'div.rez-success-msg h1';
const reservationNumber = 'span.rez-number';
const totalPriceText = '.toolbar span.price';
const driverDetailsSection = 'div.box.driver';
const driverDetailsText = 'div.box.driver h4';
const fieldLabelsLocator = 'div.field-box-left';
const fieldValuesLocator = 'div.field-box-right';
const button = 'button.btn-main';
const confirmationPopup = 'div.confirm-dialog';
const confirmationPopupHeader = 'div.confirm-dialog h4';
const yesNoButtons = '.text-center button.btn-main';
const cancelReservationButton = ':nth-child(3) > .btn-main';
const reservationCancelledMsg = '.mat-list-item-with-avatar span.mat-list-text';
const closeReservationPopupMsg = '.mat-list-item-content > .mat-focus-indicator';
const pickUpReturnVehicleText = '.branch-det h4';
const detailsHeader = '.row h4';
const verifyPickUpReturnBranchName = '.branch .name';
const verifyPickUpReturnDateTime = '.branch .datetime';
const pickUpReturnTextInDriverDetails = '.middle .row > div';
const pickUpAndReturnDetails = '.middle .row > div div';
const paymentSection = '#payment-details';
const paymentSectionTotalPrice = '#payment-details .sub-total';
const onlineCheckInLabel = '.check-in h4';
const verifyCheckInCheckBoxes = '.check-in .radio-options div';
const clickCheckInNowButton = '.check-in .radio-options button';
const onlineCheckInReservationHeader = 'div.rez-detail > h4';
const onlineCheckInPickAndReturnDetails = '.location div';
const onlineCheckInCarSize = 'div .car-size';
const onlineCheckInHeaders = '.box h4';
const onlineCheckInLabels = 'div .field-label';
const onlineCheckInButton = 'button.btn-main';
const companyName = '[name="company"]';
const onlineCheckInDriversFName = '[formcontrolname="firstName"]';
const onlineCheckInDriversLName = '[formcontrolname="lastName"]';
const onlineCheckInDriversBDate = '[formcontrolname="custDoBDay"]';
const onlineCheckInDriversBMonth = '[formcontrolname="custDoBMonth"]';
const onlineCheckInDriversBYear = '[formcontrolname="custDoBYear"]';
const onlineCheckInDriversLicense = '[formcontrolname="driverLicNo"]';
const onlineCheckInDriversCountry = '[formcontrolname="driverLicCountry"]';
const onlineCheckInDriversState = '[formcontrolname="driverLicState"]';
const onlineCheckInDriversLicExpDay = '[formcontrolname="driverLicExpDay"]';
const onlineCheckInDriversLicExpMonth = '[formcontrolname="driverLicExpMonth"]';
const onlineCheckInDriversLicExpYear = '[formcontrolname="driverLicExpYear"]';
const onlineCheckInAddressOne = '[formcontrolname="custAddress1"]';
const onlineCheckInAddressTwo = '[formcontrolname="custAddress2"]';
const onlineCheckInAddressCountry = '[formcontrolname="custCountry"]';
const onlineCheckInAddressState = '[formcontrolname="custState"]';
const onlineCheckInAddressCity = '[formcontrolname="custCity"]';
const onlineCheckInAddressPostalCode = '[formcontrolname="custPostal"]';
const onlineCheckInContactEmail = '[formcontrolname="email"]';
const onlineCheckInContactConfEmail = '[formcontrolname="confEmail"]';
const onlineCheckInContactMobileNumber = '[data-placeholder="Mobile telephone"]';
const onlineCheckInContactHomeNumber = '[data-placeholder="Home/Business telephone"]';
const onlineCheckInContactRadioBtn = '.form-field-box [class="mat-radio-label"]';
const onlineCheckInCommentBox = '[formcontrolname="custComments"]'

//commands
Cypress.Commands.add('verifySuccessMessage', () => {
    cy.get(reservationSuccessMessage).should('be.visible').should('have.text', 'YOUR RESERVATION WAS SUCCESSFUL!');
});

Cypress.Commands.add('getReservationNumber', () => {
    cy.get(reservationNumber).should('be.exist').invoke('text').as('reservationNumber');
});

Cypress.Commands.add('verifyTotalPriceInReservationPage', (tPrice) => {
    cy.get(totalPriceText).should('contain.text', tPrice);
})

Cypress.Commands.add('verifyDriverDetailsInReservationPage', (firstName, lastName, email, mobileNumber) => {
    cy.get(driverDetailsSection).should('be.visible');
    cy.get(driverDetailsText).should('contain.text', 'Driver details');

    const fieldLabels = ['First name:', 'Last name:', 'Mobile telephone:', 'Home/Business telephone:', 'Email'];
    const fieldValues = [firstName, lastName, mobileNumber, mobileNumber, email];
    fieldLabels.forEach((label, index) => {
        cy.get(fieldLabelsLocator).eq(index).should('contain.text', label);
        cy.get(fieldValuesLocator).eq(index).should('contain.text', fieldValues[index]);
    });
});

Cypress.Commands.add('verifyPickUpvaluesInDriverDetailsSection', (branch, date, time) => {
    cy.get(pickUpReturnTextInDriverDetails).should('be.visible').should('contain.text', 'Pickup:');
    const formattedTime = time.slice(0, 2) + ":" + time.slice(2);
    cy.get(pickUpAndReturnDetails).should('be.visible').should('contain', branch).should('contain', date).should('contain', formattedTime);
});

Cypress.Commands.add('verifyReturnValuesInDriverDetailsSection', (branch, date, time) => {
    cy.get(pickUpReturnTextInDriverDetails).should('be.visible').should('contain.text', 'Return:');
    const formattedTime = time.slice(0, 2) + ":" + time.slice(2);
    cy.get(pickUpAndReturnDetails).should('be.visible').should('contain', branch).should('contain', date).should('contain', formattedTime);
});

Cypress.Commands.add('clickCancelReservationButton', () => {
    cy.get(button).should('be.visible');
    cy.get(cancelReservationButton).should('contain.text', 'CANCEL RESERVATION').click({ multiple: true, waitForAnimations: false });
});

Cypress.Commands.add('confirmVehicleCancellation', (reservationNumber, lastName) => {
    cy.get(confirmationPopup).should('be.visible');
    cy.get(confirmationPopupHeader).should('contain', 'Cancel my reservation');
    cy.intercept('DELETE', `https://api.globecar.com/v1/reservations/5c394297c2bcc2692e330cd9?lang=en&reservationNo=${reservationNumber}&lastName=${lastName}`).as('deleteReservation');
    cy.get(yesNoButtons).should('be.visible').should('contain.text', 'YES').click({ multiple: true, force: true, waitForAnimations: false });
    cy.wait('@deleteReservation');
});

Cypress.Commands.add('verifyReservationIsCancelled', (reservationNumber) => {
    cy.get(reservationCancelledMsg).should('be.visible').should('contain.text', `Reservation ${reservationNumber} has been cancelled!`);
});

Cypress.Commands.add('closeReservationCancelledMessagePopup', () => {
    cy.wait(timeOuts.veryShortWait);
    cy.get(closeReservationPopupMsg).should('exist').should('be.visible').click({ force: true });
});

Cypress.Commands.add('verifyVehicleDetailsSectionIsDisplayed', () => {
    cy.get(detailsHeader).should('be.exist').should('be.visible').should('contain.text', 'Vehicle details');
});

Cypress.Commands.add('verifyPickUpSectionIsDisplayed', () => {
    cy.get(pickUpReturnVehicleText).should('be.exist').should('contain.text', 'Picking up your vehicle');
});

Cypress.Commands.add('verifyPickUpDetailsAreDisplayedCorrectly', (location, date, time) => {
    cy.get(verifyPickUpReturnBranchName).eq(0).should('have.text', location).should('be.visible');
    const formattedTime = time.slice(0, 2) + ":" + time.slice(2);
    cy.get(verifyPickUpReturnDateTime).eq(0).should('be.visible').should('contain.text', date).should('contain.text', formattedTime);
});

Cypress.Commands.add('verifyReturnSectionIsDisplayed', () => {
    cy.get(pickUpReturnVehicleText).should('be.exist').should('contain.text', ' Return your vehicle');
});

Cypress.Commands.add('verifyReturnDetailsAreDisplayedCorrectly', (location, date, time) => {
    cy.get(verifyPickUpReturnBranchName).eq(1).should('have.text', location).should('be.visible');
    const formattedTime = time.slice(0, 2) + ":" + time.slice(2);
    cy.get(verifyPickUpReturnDateTime).eq(1).should('be.visible').should('contain.text', date).should('contain.text', formattedTime);
});

Cypress.Commands.add('verifyPaymentDetailsSectionIsDisplayed', () => {
    cy.get(paymentSection).should('be.exist').should('contain.text', 'Payment details');
});

Cypress.Commands.add('verifySubTotalInPaymentDetailsSection', (tPrice) => {
    cy.get(paymentSectionTotalPrice).eq(0).should('be.exist').should('be.visible').should('not.equal', 0).should('contain.text', tPrice);
    cy.get(paymentSectionTotalPrice).eq(1).should('be.exist').should('be.visible').should('not.equal', 0).should('contain.text', tPrice);
});

Cypress.Commands.add('verifyOnlineCheckInTextIsDisplayed', () => {
    cy.get(onlineCheckInLabel).should('be.visible').should('contain.text', "Online Check in");
});

Cypress.Commands.add('verifyOnlineCheckInCheckboxLabels', () => {
    cy.get(verifyCheckInCheckBoxes).should('be.visible').should('contain.text', 'No thanks!');
    cy.get(verifyCheckInCheckBoxes).should('be.visible').should('contain.text', 'Yes, I want to check in online!');
    cy.get(verifyCheckInCheckBoxes).should('be.visible').should('contain.text', 'CHECK IN NOW!');
});

Cypress.Commands.add('clickCheckInNowButton', () => {
    cy.get(clickCheckInNowButton).should('be.exist').should('be.visible').should('contain.text', 'CHECK IN NOW!').click({ force: true });
});

Cypress.Commands.add('verifyOnlineCheckInReservationDetailsheader', (rNumber) => {
    cy.get(onlineCheckInReservationHeader).should('be.visible').should('contain.text', 'Reservation details');
    cy.get(onlineCheckInReservationHeader).should('be.visible').should('contain.text', rNumber);
});

Cypress.Commands.add('verifyOnlineCheckInPickupDetails', (location, date) => {
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains('Pickup');
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains('Pickup branch:');
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains(location);
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains('Pickup date:');
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains(date);
});

Cypress.Commands.add('verifyOnlineCheckInReturnDetails', (location, date) => {
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains('Return');
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains('Return branch:');
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains(location);
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains('Return date:');
    cy.get(onlineCheckInPickAndReturnDetails).should('exist').contains(date);
});

Cypress.Commands.add('verifyOnlineCheckInCarDetails', (carType, CarName) => {
    cy.get(onlineCheckInCarSize).should('be.visible').contains(carType);
    cy.get(onlineCheckInHeaders).should('be.visible').contains(CarName);
});

Cypress.Commands.add('verifyOnlineCheckInButtons', () => {
    cy.get(onlineCheckInButton).should('not.be.disabled').contains('CHANGE VEHICLE');
    cy.get(onlineCheckInButton).should('not.be.disabled').contains('MODIFY RESERVATION');
    cy.get(onlineCheckInButton).should('not.be.disabled').contains('VIEW RESERVATION');
});

Cypress.Commands.add('verifyOnlineCheckInDriverDetails', (fname, lname, day, month, year) => {
    cy.get(onlineCheckInHeaders).should('be.visible').contains("Driver's name and birth date");
    cy.get(onlineCheckInDriversFName).should('be.visible').and('have.value', fname);
    cy.get(onlineCheckInDriversLName).should('be.visible').and('have.value', lname);
    cy.get(onlineCheckInLabels).should('exist').contains('Date of birth*');
    cy.get(onlineCheckInDriversBDate).contains(day);
    cy.get(onlineCheckInDriversBMonth).contains(month);
    cy.get(onlineCheckInDriversBYear).contains(year);
});

Cypress.Commands.add('verifyOnlineCheckInDriverLicenseDetails', (licence, countryName, province, day, month, year) => {
    cy.get(onlineCheckInHeaders).should('be.visible').contains("Driver's license ");
    cy.get(onlineCheckInDriversLicense).should('be.visible').and('have.value', licence);
    cy.get(onlineCheckInLabels).should('exist').contains('Place of issue*');
    cy.get(onlineCheckInDriversCountry).contains(countryName);
    cy.get(onlineCheckInDriversState).contains(province);
    cy.get(onlineCheckInDriversLicExpDay).contains(day);
    cy.get(onlineCheckInDriversLicExpMonth).contains(month);
    cy.get(onlineCheckInDriversLicExpYear).contains(year);
});

Cypress.Commands.add('verifyOnlineCheckInAddressDetails', (address1, address2, countryName, province, city, zipcode) => {
    cy.get(onlineCheckInHeaders).should('be.visible').contains("Address");
    cy.get(onlineCheckInAddressOne).should('be.visible').and('have.value', address1);
    cy.get(onlineCheckInAddressTwo).should('be.visible').and('have.value', address2);
    cy.get(onlineCheckInAddressCountry).should('be.visible').contains(countryName);
    cy.get(onlineCheckInAddressState).should('be.visible').contains(province);
    cy.get(onlineCheckInAddressCity).should('be.visible').and('have.value', city);
    cy.get(onlineCheckInAddressPostalCode).should('be.visible').and('have.value', zipcode);
});

Cypress.Commands.add('verifyOnlineCheckInContactDetails', (email, mobileNumber, businessNumber, tickCheckbox, cName) => {
    cy.get(onlineCheckInHeaders).should('be.visible').contains("Contact Details");
    cy.get(onlineCheckInContactEmail).should('be.visible').and('have.value', email);
    cy.get(onlineCheckInContactConfEmail).should('be.visible').and('have.value', email);
    cy.get(onlineCheckInContactMobileNumber).should('be.visible').and('have.value', mobileNumber);
    cy.get(onlineCheckInContactHomeNumber).should('be.visible').and('have.value', businessNumber);
    const value = tickCheckbox === true ? 'yes' : 'no';
    if (tickCheckbox) {
        cy.get(onlineCheckInContactRadioBtn).should('be.visible').contains(value, { matchCase: false });
        // cy.get(companyName).should('be.visible').should('have.value', cName);
    } else {
        cy.get(onlineCheckInContactRadioBtn).should('be.visible').contains(value, { matchCase: false });
    }
});

Cypress.Commands.add('verifyOnlineCheckInPaymentDetails', () => {
    cy.get(onlineCheckInHeaders).should('be.visible').contains("Payment details");
});

Cypress.Commands.add('verifyOnlineCheckInCommentSection', (comment) => {
    cy.get(onlineCheckInHeaders).should('be.visible').contains("Comments");
    cy.get(onlineCheckInCommentBox).should('exist').and('have.value',comment)
});

Cypress.Commands.add('clickOnViewReservationButton', () => {
    cy.get(onlineCheckInButton).should('not.be.disabled').contains('VIEW RESERVATION').click();
});
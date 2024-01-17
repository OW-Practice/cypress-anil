/// <reference types= "cypress" />
import timeOuts from "../utilities/timeOuts";

//locators
const widget = 'div.rez-widget';
const countryLabel = '[for="rw-ddlCountryNor"]';
const countryDropdown = '#rw-ddlCountryNor';
const pickUpReturnLocation = '#rw-txtPickupAndReturnLoc';
const verifyLocationDropdownCollapsed = '.rw-branch-selector.collapse';
const locationsList = '[data-name="rw-list-item-left"] strong';
const nextMonthButtonInCalendar = '.ui-datepicker-next > .ui-icon';
const pickUpTime = '#rw-ddlPickupTimeNor';
const ageDropdown = '#rw-ddlAgeNor';
const returnTime = '#rw-ddlReturnTimeNor';
const findButton = '#rw-btnFindBestRatesNor';
const verifyPickUpText = 'rez-widget div.row > div > div:nth-child(1) > h2';
const verifyPickUpBranch = 'rez-widget div.row > div > div:nth-child(1) > .branch';
const verifyPickUpDateTime = 'rez-widget div.row > div > div:nth-child(1) > p.datetime';
const verifyReturnText = 'rez-widget div.row > div > div:nth-child(2) > h2';
const verifyReturnBranch = 'rez-widget div.row > div > div:nth-child(2) > .branch';
const verifyReturnDateTime = 'rez-widget div.row > div > div:nth-child(2) > p.datetime';
const corporateDropdown = '#lnkAdvance';
const expandedWidgetPanel = 'div#rez-tab-content';
const vehicleTypeLabel = '[for="rw-ddlVehTypeAdv"]';
const vehicleTypeDropdown = '#rw-ddlVehTypeAdv';
const returnLocationLabel = '#div-vehType-md-adv + div label';
const returnLocationDropdown = '#rw-txtReturnLoc';
const promoLabel = '#div-Age-sm-adv + div label';
const promoInputField = '#rw-txtPromo';
const collapsedWidgetPanel = '#rw-minimal.hidden-md';
const pickUpLocation = '#rw-txtPickupLoc';
const returnLocation = '#rw-txtReturnLoc';
const ageLabel = '[for="rw-ddlAgeAdv"]';
const ageValueInExpandedDropdown = '#rw-ddlAgeAdv';
const validatePromo = 'a.apply-promo';
const alertPopup = 'div.alertify';
const okButton = '.ok';
const crossIcon = 'a + span.reset-icon';
let month, year, day;

//commands
Cypress.Commands.add('verifySelectedCountryIsDisplayed', (name) => {
    cy.get(countryLabel).should('have.text', 'COUNTRY');
    cy.get(countryDropdown).select(name, { force: true }).should('have.text', name);
});

Cypress.Commands.add('verifyAllLocationsAreDisplayed', (locationData) => {
    cy.get(widget).should('be.visible');
    cy.get(pickUpReturnLocation).should('exist').click({ force: true });
    cy.get(verifyLocationDropdownCollapsed).should('be.visible');

    cy.get(locationsList).each((location, index) => {
        const locationKey = Object.keys(locationData)[index];
        cy.wrap(location).should('include.text', locationData[locationKey]);
    });
});

Cypress.Commands.add('selectThePickupReturnLocation', (selectLocation) => {
    cy.get(locationsList).contains(selectLocation).click({ force: true });
    cy.get(pickUpReturnLocation).should('have.value', selectLocation);
});

Cypress.Commands.add('verifyAllLocationsInPickUpBranch', (locationData) => {
    cy.get(widget).should('be.visible');
    cy.get(pickUpLocation).should('exist').should('be.visible').click({ force: true });
    cy.get(verifyLocationDropdownCollapsed).should('be.visible');

    cy.get(locationsList).each((location, index) => {
        const locationKey = Object.keys(locationData)[index];
        cy.wrap(location).should('include.text', locationData[locationKey]);
    });
});

Cypress.Commands.add('selectPickUpLocation', (pickUpLoc) => {
    cy.get(locationsList).contains(pickUpLoc).click({ force: true });
    cy.get(pickUpLocation).should('have.value', pickUpLoc);
});

Cypress.Commands.add('verifyAllLocationsInReturnBranch', (locationData) => {
    cy.get(widget).should('be.visible');
    cy.get(returnLocation).should('exist').should('be.visible').click({ force: true });
    cy.get(verifyLocationDropdownCollapsed).should('be.visible');

    cy.get(locationsList).each((location, index) => {
        const locationKey = Object.keys(locationData)[index];
        cy.wrap(location).should('include.text', locationData[locationKey]);
    });
});

Cypress.Commands.add('selectReturnLocation', (returnLoc) => {
    cy.get(locationsList).contains(returnLoc).click({ force: true });
    cy.get(returnLocation).should('have.value', returnLoc);
});

function selectAvailableDate(currentRow, currentColumn, isFound) {
    const dateSelector = `tr:nth-child(${currentRow}) td:nth-child(${currentColumn})`;
    const daySelector = `tr:nth-child(${currentRow}) td:nth-child(${currentColumn}) a`;
    return cy.get(dateSelector).eq(0).invoke('attr', 'class').then(($attrValue) => {
        if (!($attrValue.includes('date-closed') || $attrValue.includes('ui-datepicker-unselectable'))) {
            cy.get(dateSelector).eq(0).click({ force: true });
            isFound = true;
            return cy.get(dateSelector).eq(0).then(($td) => {
                month = $td.data('month');
                year = $td.data('year');
                const formattedMonth = String(month + 1).padStart(2, '0');
                return `${formattedMonth}/${year}`;
            }).then((date) => {
                return cy.get(daySelector).eq(0).invoke('text').then((text) => {
                    const formattedDay = String(text).padStart(2, '0');
                    const val = `${formattedDay}/${date}`;
                    return val;
                });
            });
        } else {
            if (currentColumn < 7 && !isFound) {
                return selectAvailableDate(currentRow, currentColumn + 1, isFound);
            } else if (currentRow < 6 && !isFound) {
                if ($attrValue.includes('ui-datepicker-unselectable')) {
                    cy.get(nextMonthButtonInCalendar).should('be.visible').click({ force: true });
                    return selectAvailableDate(1, 1, isFound);
                } else {
                    return selectAvailableDate(currentRow + 1, 1, isFound);
                }
            }
        }
    });
}

Cypress.Commands.add('selectPickUpDate', () => {
    cy.get(nextMonthButtonInCalendar).as('btn').should('be.visible').click({ force: true });
    cy.get('@btn').should('be.visible').click({ force: true });
    cy.wait(timeOuts.veryShortWait);
    const isFound = false;
    selectAvailableDate(3, 3, isFound).then((date) => {
        cy.wrap(date).as('pickupDate');
    });
});

Cypress.Commands.add('selectPickUpTime', (time) => {
    cy.get(pickUpTime).select(time, { force: true }).should('have.value', time);
});

Cypress.Commands.add('selectReturnDate', () => {
    const isFound = false;
    selectAvailableDate(3, 4, isFound).then((date) => {
        cy.wrap(date).as('returnDate');
    });
});

Cypress.Commands.add('selectReturnTime', (time) => {
    cy.get(returnTime).select(time, { force: true }).should('have.value', time);
});

Cypress.Commands.add('verifyAgeDropdown', () => {
    cy.get(ageLabel).should('have.text', 'AGE');
    cy.get(ageValueInExpandedDropdown).should('exist').should('be.visible');
});

Cypress.Commands.add('selectAge', (age) => {
    cy.get(ageValueInExpandedDropdown).should('be.visible').contains(age).click({ force: true })
})

Cypress.Commands.add('searchCars', () => {
    cy.get(findButton).should('exist').click({ force: true });
});

Cypress.Commands.add('verifyPickupLocationIsDisplayed', (location) => {
    cy.get(verifyPickUpText).should('be.visible').should('have.text', 'PICKUP');
    cy.get(verifyPickUpBranch).should('have.text', location);
});

Cypress.Commands.add('verifyPickupDateAndTimeIsDisplayed', (inputDate, inputTime) => {
    const formattedTime = inputTime.slice(0, 2) + ":" + inputTime.slice(2);
    cy.get(verifyPickUpDateTime).should('contain.text', inputDate).should('contain.text', formattedTime);
});

Cypress.Commands.add('verifyReturnLocationIsDisplayed', (location) => {
    cy.get(verifyReturnText).should('be.visible').should('have.text', 'RETURN');
    cy.get(verifyReturnBranch).should('have.text', location);
});

Cypress.Commands.add('verifyReturnDateAndTimeIsDisplayed', (inputDate, inputTime) => {
    const formattedTime = inputTime.slice(0, 2) + ":" + inputTime.slice(2);
    cy.get(verifyReturnDateTime).should('contain.text', inputDate).should('contain.text', formattedTime);
});

Cypress.Commands.add('clickCorporateRental', () => {
    cy.get(corporateDropdown).should('be.exist').click({ force: true });
    cy.get(expandedWidgetPanel).should('be.visible');
});

Cypress.Commands.add('verifyVehicleTypeIsDisplayed', () => {
    cy.get(vehicleTypeLabel).should('be.exist').should('be.visible').should('have.text', 'VEHICLE TYPE');
    cy.get(vehicleTypeDropdown).should('be.exist').should('be.visible');
});

Cypress.Commands.add('selectVehicleType', (type) => {
    cy.get(vehicleTypeDropdown).select(type, { force: true });
    cy.get(vehicleTypeDropdown).should('contain.text', type);
});

Cypress.Commands.add('verifyReturnLocationInExpandedWidgetIsDisplayed', () => {
    cy.get(returnLocationLabel).should('be.exist').should('be.visible');
    cy.get(returnLocationDropdown).should('be.exist').should('be.visible');
});

Cypress.Commands.add('verifyPromoCompanyIsDisplayed', () => {
    cy.get(promoLabel).should('be.exist').should('be.visible');
    cy.get(promoInputField).should('be.exist').should('be.visible');
});

Cypress.Commands.add('enterPromoCode', (code) => {
    cy.get(promoInputField).type(code).should('have.value', code);
    cy.intercept('POST', 'https://api.globecar.com/v1/validatediscountcode/5c394297c2bcc2692e330cd9/').as('discount');
});

Cypress.Commands.add('validatePromoCode', () => {
    cy.get(validatePromo).should('be.exist').should('be.visible').click({ force: true });
    cy.wait('@discount');
    cy.contains('We are sorry').then(($el) => {
        if ($el.length) {
            cy.get(alertPopup).should('be.exist').should('be.visible');
            cy.get(okButton).should('be.visible').click({ force: true });
            cy.get(okButton).should('not.be.exist');
            cy.get(crossIcon).should('be.visible').click({ force: true });
        }
    });
});

Cypress.Commands.add('minimizeWidget', () => {
    cy.get(corporateDropdown).should('be.visible').click({ force: true });
    cy.get(collapsedWidgetPanel).should('be.exist').should('not.be.visible');
});
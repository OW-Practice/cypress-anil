import * as setDevice from '../fixtures/viewPorts.json';

//commands
Cypress.Commands.add("setViewportBasedOnDevice", (deviceName) => {
    const dimensions = Object.values(setDevice.viewportDimensions[deviceName]);
    cy.viewport(dimensions[0], dimensions[1]);
});
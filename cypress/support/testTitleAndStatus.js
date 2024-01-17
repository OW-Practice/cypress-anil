//commands
Cypress.Commands.add("getTestTitle", () => {
    const test = Cypress.currentTest.title;
    return test;
})

Cypress.Commands.add("getTestStatus", () => {
    const status = Cypress.mocha.getRunner().suite.ctx.currentTest.state;
    return status;
})
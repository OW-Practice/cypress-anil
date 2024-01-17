//commands
Cypress.Commands.add('sendEmail', (scriptPath, title, runUrl, cloudId) => {
    return cy.exec(`node ${scriptPath} "${title}" "${runUrl}" "${cloudId}"`, (error) => {
        if (error) {
            throw new Error(`Failed to execute ${scriptPath}: ${error.message}`);
        }
    });
});

Cypress.Commands.add('addAttachments', (scriptPath, path, runId) => {
    return cy.exec(`node ${scriptPath} "${path}" "${runId}"`, (error) => {
        if (error) {
            throw new Error(`Failed to execute ${scriptPath}: ${error.message}`);
        }
    });
});

Cypress.Commands.add('getResetEmailPasswordLink', (scriptPath, email) => {
    return cy.exec(`node ${scriptPath} ${email}`, (error) => {
        if (error) {
            throw new Error(`Failed to execute ${scriptPath}: ${error.message}`);
        }
    });
});
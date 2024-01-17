import testrail from '../fixtures/testrailData.json';

//Commands
Cypress.Commands.add('getCaseId', (title) => {
    const caseValue = title.split(':')[0];
    const caseId = caseValue.replace('C', '');
    return caseId;
});

Cypress.Commands.add('addResultForCase', (runId, caseId, statusId, message) => {
    const apiUrl = `${testrail.endPoint}/api/v2/add_result_for_case/${runId}/${caseId}`;
    const payload = {
        status_id: statusId,
        comment: message
    };
    cy.request({
        method: 'POST',
        url: apiUrl,
        auth: {
            username: testrail.username,
            password: testrail.password
        },
        body: payload,
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
});

Cypress.Commands.add('getTestrailResultIdForCase', (runId, caseId) => {
    const apiUrl = `${testrail.endPoint}/api/v2/get_results_for_case/${runId}/${caseId}`;
    cy.request({
        method: 'GET',
        url: apiUrl,
        auth: {
            username: testrail.username,
            password: testrail.password
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        const result = response.body.results;
        const lastObject = result.splice(0, 1)[0];
        const lastId = JSON.stringify(lastObject.id);
        return lastId;
    });
});

Cypress.Commands.add('createARun', (projectId, runName) => {
    const apiUrl = `${testrail.endPoint}/api/v2/add_run/${projectId}`;
    const payload = {
        "name": runName,
        "include_all": false,
        "case_ids": [30]
    }
    cy.request({
        method: 'POST',
        url: apiUrl,
        auth: {
            username: testrail.username,
            password: testrail.password
        },
        body: payload,
    }).then((response) => {
        expect(response.status).to.eq(200);
        const result = response.body.url;
        const parts = result.split("/");
        const number = parts[parts.length - 1];
        return number;
    });
});

Cypress.Commands.add("closePreviousTestRun", (testRunId) => {
    const previousRunId = testRunId - 1;
    const apiUrl = `${testrail.endPoint}/api/v2/close_run/${previousRunId}`;
    cy.request({
        method: "POST",
        url: apiUrl,
        auth: {
            username: testrail.username,
            password: testrail.password
        },
        headers: {
            "Content-type": "application/json"
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
});
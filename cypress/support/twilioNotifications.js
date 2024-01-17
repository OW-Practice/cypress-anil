import { accountSid, fromNumber, authToken } from "../fixtures/twilioData.json";

Cypress.Commands.add("sendSms", (to, textBody) => {
    const twilioApiUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const data = {
        To: to,
        From: fromNumber,
        Body: textBody,
    }
    cy.request({
        method: 'POST',
        url: twilioApiUrl,
        auth: {
            username: accountSid,
            password: authToken,
        },
        form: true,
        body: data
    }).then((response) => {
        expect(response.status).to.eq(201);
    })
});
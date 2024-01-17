const nodemailer = require('nodemailer');
const smtpDetails = require('../fixtures/smtpData.json');
const fs = require('fs');
const testrail = require('../fixtures/testrailData.json');

const filePath = 'cypress/fixtures/runtimeGenerated.json'; // Change this to the correct path
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const lastRecord = jsonData[Object.keys(jsonData).pop()];
const testStatus = lastRecord.testStatus.toUpperCase();
const [currentTitle, runIdUrl, cloudId] = process.argv.slice(2);
const now = new Date();
const currentDate = now.toISOString().slice(0, 19).replace(/[-T]/g, '_').replace(/:/g, '-');

const tableHTML = `
<body>
    <p>Hi Team,</p>
    <p>Here are the Cypress test results.</p>
    <p>Click the following link to see the <b>Testrail</b> test result:</p>
    <p><a href="${testrail.endPoint}/runs/view/${runIdUrl}">${testrail.endPoint}/runs/view/${runIdUrl}</a></p>
    <p>Click the following link to see the <b>Cypress Cloud</b> test result:</p>
    <p><a href="https://cloud.cypress.io/projects/${cloudId}/runs">https://cloud.cypress.io/projects/${cloudId}/runs</a></p>
</body>
<h1 style="color: #ff6c00;">Reservation Details</h1>
<table style="border-collapse: collapse; width: 50%;">
    <thead>
        <tr>
            <th style="border: 1px solid black; padding: 8px; text-align: left; background-color: #FFFFFF; font-size: 18px; color: black;">Fields</th>
            <th style="border: 1px solid black; padding: 8px; text-align: left; background-color: #FFFFFF; font-size: 18px; color: black;">Info</th>
        </tr>
    </thead>
    <tbody>
        ${Object.entries(lastRecord)
        .map(([key, value]) => `
                <tr>
                    <td style="border: 1px solid black; padding: 8px; text-align: left; font-size: 18px; color: black;"><strong>${key}:</strong></td>
                    <td style="border: 1px solid black; padding: 8px; text-align: left; font-size: 18px; color: black;">${value}</td>
                </tr>
            `)
        .join('')}
    </tbody>
</table>
`;

const transporter = nodemailer.createTransport({
    host: smtpDetails.host,
    port: smtpDetails.port,
    auth: {
        user: smtpDetails.username,
        pass: smtpDetails.password
    },
});

const toMail = smtpDetails.toMail;
const toMailAddresses = Object.values(toMail);

const mailOptions = {
    from: smtpDetails.fromMail,
    to: toMailAddresses,
    subject: `${testStatus} TEST: "${currentTitle}" and created at ${currentDate}`,
    html: tableHTML,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
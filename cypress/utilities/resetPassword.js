const { google } = require('googleapis');
const fs = require('fs');
const cheerio = require('cheerio');

const TOKEN_PATH = 'cypress/resources/token.json';
const CRED_PATH = 'cypress/resources/credentials.json';
const email = process.argv[2];

fs.readFile(CRED_PATH, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), listMessages);
});

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function listMessages(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const query = `'to:${email} subject:Password reset of your Globe Car & Truck Rentals account`;
    gmail.users.messages.list({
        userId: 'me',
        q: query
    }, (err, res) => {
        if (err) return console.log('The API returned an error:', err);
        const messages = res.data.messages;
        if (messages && messages.length) {
            gmail.users.messages.get({
                userId: 'me',
                id: messages[0].id,
                format: 'full',
            }, (err, messageDetails) => {
                if (err) return console.log('Error retrieving message details:', err);
                const body = getMessageBody(messageDetails.data.payload);
                const $ = cheerio.load(body);
                const resetPasswordLink = $('a.lnkBtn').attr('href');
                console.log(resetPasswordLink);
                return resetPasswordLink;
            });
        } else {
            console.log('No messages found.');
        }
    });
}

function getMessageBody(payload) {
    if (payload.parts && payload.parts.length > 0) return payload.parts.map(part => Buffer.from(part.body.data, 'base64').toString()).join('');
    else if (payload.body && payload.body.data) return Buffer.from(payload.body.data, 'base64').toString();
    else return '';
}
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const testrail = require('../fixtures/testrailData.json');

const directoryPath = process.argv[2];
const runId = process.argv[3];
const testRailAPIUrl = `${testrail.endPoint}/api/v2/add_attachment_to_result/${runId}`;

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }
    const pngFiles = files.filter((file) => file.endsWith('.png'));
    pngFiles.forEach((pngFile) => {
        const form = new FormData();
        const fileStream = fs.createReadStream(`${directoryPath}/${pngFile}`);
        form.append('attachment', fileStream, { filename: pngFile });
        axios.post(testRailAPIUrl, form, {
            headers: {
                ...form.getHeaders(),
            },
            auth: {
                username: testrail.username,
                password: testrail.password,
            },
        }).then((response) => {
            console.log('Response from TestRail:', response.data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    });
});
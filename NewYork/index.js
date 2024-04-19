const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const filePath = path.join(__dirname, 'emails.json');

app.listen(3002, () => console.log('Listening at port 3002'));
// Serve files from the 'public' directory
app.use(express.static('public'));

app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) => {
    const newEmail = request.body;
    console.log(newEmail);

    fs.readFile(filePath, (err, data) => {
        let emails = [];

        if (err) {
            console.error('Error reading file:', err);
            // Initialize file with empty array if it doesn't exist
            fs.writeFile(filePath, JSON.stringify([], null, 2), writeErr => {
                if (writeErr) {
                    console.error('Error initializing file:', writeErr);
                    response.status(500).json({ message: "Failed to initialize data file" });
                    return;
                }
            });
        } else if (data.length === 0) {
            // Handle empty file scenario
            emails = [];
        } else {
            try {
                emails = JSON.parse(data.toString());
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                response.status(500).json({ message: "Error parsing data file" });
                return;
            }
        }

        emails.push(newEmail);

        fs.writeFile(filePath, JSON.stringify(emails, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
                response.status(500).json({ message: "Failed to store data" });
            } else {
                response.json({
                    message: "Data received at /api",
                    email: request.body.email
                });
            }
        });
    });
});


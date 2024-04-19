const express = require('express');
const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.listen(3001, () => console.log('Listening at port 3001'));

// Define other routes as needed
app.post('/api', (request, response) => {
    console.log(request.body);
    response.json({
        message: "Data received at /api",
        email: request.body.email
    });
});
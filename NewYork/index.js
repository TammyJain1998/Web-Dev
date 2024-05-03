require("dotenv").config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Place = require('./models/places');
const filePath = path.join(__dirname, 'emails.json');

//connect to mongodb
//const dbURL = "mongodb+srv://tamannajain:Tamanna1998@places.m2dgelx.mongodb.net/NewYork?retryWrites=true&w=majority&appName=Places";

mongoose.connect(process.env.MONGO_URL)
  .then((result) => console.log('connected to db'))
  .catch((err) => console.error('Failed to connect to db', err));

// Serve files from the 'public' directory
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use(cors());

const port = process.env.PORT || 3002

app.listen(port, () => {
    console.log(`Listening at ${port}`)
});

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

async function loadFetch() {
    const { default: fetch } = await import('node-fetch');
    return fetch;
}

app.get('/weather', async (req, res) => {
    const fetch = await loadFetch();  // Load fetch dynamically
    const apiKey = process.env.WEATHER_API_KEY;
    const city = 'New York';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

// POST endpoint to create a new place
app.post('/places', (req, res) => {
    const newPlace = new Place({
        "title": "Empire State Building",
        "description": "A 102-story Art Deco skyscraper in Midtown Manhattan. An iconic symbol of New York City.",
        "location": "350 Fifth Avenue, Manhattan, NY 10118",
        "rating": 4.7,
        "imageUrl": "https://media.tacdn.com/media/attractions-splice-spp-674x446/12/2e/1c/fe.jpg",
    });
    
    newPlace.save()
      .then(results => {
        console.log('Place saved:', results);
        res.status(201).json(results); // Send back the created place
      })
      .catch(error => {
        console.error('Error saving place:', error);
        res.status(500).json({ message: "Failed to save the place" });
      });
  });

  app.get('/list-places', async (req, res) => {
    try {
        const places = await Place.find();  // Use Mongoose to find all places
        console.log(places)
        res.json(places);
    } catch (error) {
        console.error('Failed to retrieve places:', error);
    }
});

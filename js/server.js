const express = require('express');
const path = require('path');

const app = express();

// Config Express.js
app.use(express.json()); // Middleware to parse JSON in requests
app.set('port', 4000); // Set the port number to 4000
app.use((req, res, next) => {
    // Set headers for CORS (Cross-Origin Resource Sharing)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

// Serve static files from the 'images', 'css', and 'js' directories
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));

// Define a route handler for the root path to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start the Express.js server on port 4000
app.listen(4000, () => {
    console.log('Express.js server running at localhost:4000');
});

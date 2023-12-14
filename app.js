const express = require('express');
const mongoose = require('mongoose');
const { fetchForexData } = require('./functions');
require('dotenv').config();

console.log('Starting Forex Trading Bot server...');

const app = express();
const port = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/forex', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/forex', async (req, res) => {
    const dataSource = req.query.source || 'alphaVantage';
    try {
        const data = await fetchForexData(dataSource);
        res.json(data || {});
    } catch (error) {
        console.error('Error in /forex route:', error);
        res.status(500).json({ error: 'Error fetching Forex data' });
    }
});

const multer = require('multer');
const data = require('./data'); // Import data handling functions

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Define a route to upload historical data
app.post('/upload', upload.single('historicalData'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;
    const historicalData = data.readHistoricalData(filePath);

    // Preprocess the uploaded data
    const preprocessedData = data.preprocessData(historicalData);

    // Do further processing with the data as needed

    // Send a success response
    res.status(200).send('Data uploaded and processed successfully.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('app.js loaded and executed successfully.');
});


// Handle suggestions based on user input
app.get('/suggestions', (req, res) => {
    // Implement logic to fetch currency suggestions based on req.query.searchTerm
    // You can use a database or an API to get relevant suggestions
    const searchTerm = req.query.searchTerm; // Retrieve the search term from the request
    // Implement your logic here to fetch and send suggestions
    // For example, you can query a database or use an external API
    const suggestions = []; // Replace with actual suggestions

    res.json(suggestions);
});


// Define a route for handling Forex data searches
app.get('/forex/search', (req, res) => {
    const query = req.query.q;
    // Perform a database query or fetch data from an API based on the search query
    // Process the data and return it as HTML or JSON
    // ...

    // Example response
    const responseData = `<p>Results for "${query}"</p><ul><li>Result 1</li><li>Result 2</li></ul>`;
    res.send(responseData);
});



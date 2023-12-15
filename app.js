const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const EXCHANGE_API_KEY = '4db84bd8952cf3eda7baf7b6'; // Use your actual API key
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';

app.use(express.static('public'));

// Endpoint for current currencies
app.get('/api/currencies', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}${EXCHANGE_API_KEY}/codes`);
        res.json(response.data.supported_codes.map(code => code[0]));
    } catch (error) {
        console.error('Error fetching currencies:', error);
        res.status(500).send('Error fetching currencies');
    }
});

// Endpoint for current exchange rates
app.get('/api/rates/:currency', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}${EXCHANGE_API_KEY}/latest/${req.params.currency}`);
        res.json(response.data.conversion_rates);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        res.status(500).send('Error fetching rates');
    }
});

// New endpoint for fetching historical data using Frankfurter API
app.get('/api/historical/:currency/:date', async (req, res) => {
 const { currency, date } = req.params;

    // Validate the date format here (as an example)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).send('Invalid date format. Use YYYY-MM-DD.');
    }
    const url = `https://api.frankfurter.app/${date}?from=${currency}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching historical data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

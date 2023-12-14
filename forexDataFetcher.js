const axios = require('axios');
const ForexData = require('./forexModel');

async function fetchForexData() {
    try {
        const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
                function: 'CURRENCY_EXCHANGE_RATE',
                from_currency: 'EUR',
                to_currency: 'AUD',
                apikey: process.env.ALPHA_VANTAGE_API_KEY
            }
        });

        // Process and save the data
        // ...

        return forexData;
    } catch (error) {
        console.error('Error fetching Forex data:', error);
        throw error;
    }
}

module.exports = { fetchForexData };

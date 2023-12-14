const axios = require('axios');
const ForexData = require('./forexModel');

async function fetchForexData(source) {
    try {
        let forexData;
        if (source === 'alphaVantage') {
            // Alpha Vantage logic
        } else if (source === 'exchangeRateApi') {
            // ExchangeRate-API logic
        } else if (source === 'fixerIo') {
            const response = await axios.get(`http://data.fixer.io/api/latest?access_key=2b6d6287c6c517802a3710079e7f1821&base=EUR`);
            if (response.data && response.data.rates) {
                const rates = response.data.rates;
                const audRate = rates['AUD'];
                forexData = new ForexData({
                    fromCurrency: 'EUR',
                    toCurrency: 'AUD',
                    exchangeRate: audRate,
                    timestamp: new Date()
                });
                await forexData.save();
            } else {
                throw new Error('Invalid response structure from Fixer.io');
            }
        }
        return forexData;
    } catch (error) {
        console.error('Error fetching Forex data:', error);
        throw error;
    }
}

module.exports = { fetchForexData };

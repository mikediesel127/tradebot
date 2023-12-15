require('dotenv').config();
const axios = require('axios');
const ForexData = require('./forexModel'); // Adjust if your model is different

const FIXER_API_ENDPOINT = 'http://data.fixer.io/api/latest';

async function fetchFromFixerIo() {
    try {
        const response = await axios.get(FIXER_API_ENDPOINT, {
            params: {
                access_key: process.env.FIXER_API_KEY,
                base: 'EUR',
                symbols: 'USD,AUD,CAD,PLN,MXN,GBP,JPY,CHF,EUR' // Further expanded currency list
            }
        });
        if (response.data.success) {
            return response.data.rates;
        } else {
            throw new Error(response.data.error.info);
        }
    } catch (error) {
        console.error('Error fetching from Fixer.io:', error);
        throw error;
    }
}

function calculateEMA(data, period = 10) {
    let ema = [data[0]];
    let k = 2 / (period + 1);

    for (let i = 1; i < data.length; i++) {
        ema.push(data[i] * k + ema[i - 1] * (1 - k));
    }
    return ema;
}

function calculateSMA(data, period = 10) {
    let sma = [];
    for (let i = 0; i < data.length; i++) {
        if (i + period <= data.length) {
            sma.push(data.slice(i, i + period).reduce((a, b) => a + b, 0) / period);
        }
    }
    return sma;
}

function processData(data) {
    let ratesArray = Object.values(data);
    let emaData = calculateEMA(ratesArray);
    let smaData = calculateSMA(ratesArray);

    return {
        originalRates: data,
        ema: emaData,
        sma: smaData
    };
}

module.exports = { fetchFromFixerIo, processData };

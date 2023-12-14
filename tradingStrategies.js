const { RSI } = require('technicalindicators');

function calculateRSI(prices) {
    // RSI calculation logic
    // ...
}

function calculateMovingAverage(data, period) {
    // Moving average calculation logic
    // ...
}

function shouldBuy(smaShort, smaLong) {
    // Buying logic
    // ...
}

function shouldSell(smaShort, smaLong) {
    // Selling logic
    // ...
}

module.exports = { calculateRSI, calculateMovingAverage, shouldBuy, shouldSell };

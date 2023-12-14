const mongoose = require('mongoose');

const forexSchema = new mongoose.Schema({
    fromCurrency: String,
    toCurrency: String,
    exchangeRate: Number,
    bidPrice: Number,
    askPrice: Number,
    timestamp: Date
});

const ForexData = mongoose.model('ForexData', forexSchema);

module.exports = ForexData;

const mongoose = require('mongoose');

const forexSchema = new mongoose.Schema({
    fromCurrency: {
        type: String,
        required: true
    },
    toCurrency: {
        type: String,
        required: true
    },
    exchangeRate: {
        type: Number,
        required: true
    },
    bidPrice: {
        type: Number,
        required: false // Set to true if this field is always available
    },
    askPrice: {
        type: Number,
        required: false // Set to true if this field is always available
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ForexData = mongoose.model('ForexData', forexSchema);

module.exports = ForexData;

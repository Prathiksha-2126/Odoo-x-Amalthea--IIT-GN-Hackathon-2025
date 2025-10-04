const axios = require('axios');

const convert = async (from, to, amount) => {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const rate = response.data.rates[to];
        if (rate) {
            return amount * rate;
        }
        throw new Error(`Conversion rate from ${from} to ${to} not found.`);
    } catch (error) {
        console.error('Currency conversion error:', error.message);
        // Fallback or error handling
        return amount; // or throw error
    }
};

module.exports = { convert };
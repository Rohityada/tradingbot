// src/index.js
const express = require('express');
const TradingBot = require('./tradingBot');
const app = express();
const bot = new TradingBot();
const PORT = process.env.PORT || 3000;

app.get('/api/start', async (req, res) => {
    setInterval(async () => {
        const price = await bot.fetchStockPrice();
        bot.decideTrade(price);
    }, 5000); // Check every 5 seconds

    res.send("Trading bot started");
});

app.get('/api/summary', (req, res) => {
    res.json(bot.summary());
});

app.listen(PORT, () => {
    console.log(`Trading bot server running on port ${PORT}`);
});

// src/tradingBot.js
const axios = require('axios');

class TradingBot {
    constructor() {
        this.balance = 1000; // Starting balance
        this.position = 0; // Number of stocks owned
        this.lastPrice = null;
        this.trades = [];
    }

    async fetchStockPrice() {
        try {
            const response = await axios.get('http://localhost:5000/api/stock');
            return response.data.price;
        } catch (error) {
            console.error("Error fetching stock price:", error);
        }
    }

    decideTrade(price) {
        if (this.lastPrice === null) {
            this.lastPrice = price;
            return;
        }

        // Buy condition
        if (price < this.lastPrice * 0.98) { // 2% drop
            const amountToBuy = Math.floor(this.balance / price);
            this.position += amountToBuy;
            this.balance -= amountToBuy * price;
            this.trades.push({ type: 'buy', price, amount: amountToBuy });
        }

        // Sell condition
        if (price > this.lastPrice * 1.03) { // 3% rise
            if (this.position > 0) {
                this.balance += this.position * price;
                this.trades.push({ type: 'sell', price, amount: this.position });
                this.position = 0; // Sell all stocks
            }
        }

        this.lastPrice = price;
    }

    summary() {
        const profitLoss = this.balance + this.position * this.lastPrice - 1000; // Initial balance
        return {
            balance: this.balance,
            position: this.position,
            profitLoss,
            trades: this.trades,
        };
    }
}

module.exports = TradingBot;

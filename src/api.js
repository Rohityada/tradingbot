// src/api.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Mock stock prices
let stockPrice = 100;

app.get("/api/stock", (req, res) => {
  // Simulate stock price change
  stockPrice += (Math.random() - 0.5) * 10; // Random price fluctuation
  res.json({ price: stockPrice });
});

app.listen(PORT, () => {
  console.log(`Mock API running on port ${PORT}`);
});

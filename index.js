// Load environment variables
require('dotenv').config();

// Core imports
const express = require('express');
const db = require('./db');
const { BotFrameworkAdapter } = require('botbuilder');
const { RestaurantBot } = require('./bot/restaurantBot');

const app = express(); // ✅ Must be declared before use

// Middleware
app.use(express.json());

// Bot Framework adapter
const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID || '',
  appPassword: process.env.MICROSOFT_APP_PASSWORD || ''
});

// Bot instance
const bot = new RestaurantBot();

// Bot endpoint
app.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});

// API Routes
app.use('/api/menus', require('./routes/menus'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/users', require('./routes/users'));
app.use('/chat', require('./routes/chat')); // Optional

// Root test route
app.get('/', (req, res) => {
  res.send('🍽️ Welcome to the Restaurant Bot API!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Load environment variables
require('dotenv').config();

// Core imports
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');
const { BotFrameworkAdapter } = require('botbuilder');
const { RestaurantBot } = require('./bot/restaurantBot');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

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

// Swagger Setup 🚀
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/menus', require('./routes/menus'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/users', require('./routes/users'));
app.use('/chat', require('./routes/chat')); // Optional

// Fallback route to serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

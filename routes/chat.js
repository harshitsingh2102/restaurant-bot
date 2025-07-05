const express = require('express');
const router = express.Router();
const restaurantBot = require('../bot/restaurantBot'); // path to your chatbot logic

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const reply = await restaurantBot.getBotResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error('Bot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

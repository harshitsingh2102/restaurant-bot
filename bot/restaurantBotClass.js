const { BotFrameworkAdapter } = require('botbuilder');
const { RestaurantBot } = require('./restaurantBot'); // ✅ correct casing

const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID || '',
  appPassword: process.env.MICROSOFT_APP_PASSWORD || ''
});

const bot = new RestaurantBot();

module.exports = { adapter, bot };

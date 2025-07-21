const { ActivityHandler } = require('botbuilder');
const getIntentFromCLU = require('../services/witService'); // using Wit.ai here
const restaurantController = require('../controllers/restaurantController');
const orderController = require('../controllers/orderController');
const reservationController = require('../controllers/reservationController');
const { createReservation } = require('../controllers/reservationController');
const recommendService = require('../services/recommendation'); // <-- integrated

class RestaurantBot extends ActivityHandler {
  constructor() {
    super();
    this.conversationState = {};

    this.onMessage(async (context, next) => {
      const userId = context.activity.from.id;
      const userMessage = context.activity.text.trim();

      console.log(`📨 User said: ${userMessage}`);

      if (!this.conversationState[userId]) {
        this.conversationState[userId] = { step: null, data: {} };
      }

      const state = this.conversationState[userId];

      // Reservation conversation flow
      if (state.step === 'awaiting_date') {
        state.data.date = userMessage;
        state.step = 'awaiting_time';
        await context.sendActivity('⏰ Got it! Now tell me the time for your reservation.');
        return;
      } else if (state.step === 'awaiting_time') {
        state.data.time = userMessage;
        state.step = 'awaiting_guests';
        await context.sendActivity('👥 Great! How many guests?');
        return;
      } else if (state.step === 'awaiting_guests') {
        state.data.guests = parseInt(userMessage);
        state.step = null;

        const reservationData = {
          userId: 1, // placeholder or session-based
          restaurantId: 2, // you may want to ask or detect this too
          date: state.data.date,
          time: state.data.time,
          guests: state.data.guests,
          specialRequest: ''
        };

        try {
          const reservation = await createReservation(reservationData);
          await context.sendActivity(`✅ Reservation confirmed!\n📅 ${reservation.date} 🕒 ${reservation.time} 👥 ${reservation.partySize} guests\n🪪 ID: ${reservation.id}`);
        } catch (err) {
          console.error('❌ Reservation Error:', err.message);
          await context.sendActivity('❌ Could not complete the reservation.');
        }

        this.conversationState[userId] = { step: null, data: {} };
        return;
      }

      // Intent detection
      const intent = await getIntentFromCLU(userMessage);
      console.log(`🎯 Detected Intent: ${intent}`);

      let reply = '';

      switch (intent) {
        case 'FindRestaurant':
          const results = await restaurantController.searchRestaurants(userMessage);
          reply = results.length > 0
            ? `🍽️ Here are some restaurants:\n${results.map(r => `- ${r.name}`).join('\n')}`
            : `😕 No matching restaurants found.`;
          break;

        case 'MakeReservation':
          // Start reservation flow
          state.step = 'awaiting_date';
          state.data = {};
          reply = '📅 Sure! What date would you like to reserve a table for?';
          break;

        case 'PlaceOrder':
          const dummyOrder = {
            userId: 1,
            restaurantId: 2,
            items: [
              { menuItemId: 101, quantity: 2 },
              { menuItemId: 104, quantity: 1 }
            ],
            totalAmount: 750
          };

          try {
            const orderResult = await orderController.placeOrder(dummyOrder);
            reply = orderResult.success
              ? `✅ Order placed!\n🧾 Order ID: ${orderResult.orderId}`
              : `❌ Could not place your order.`;
          } catch (err) {
            console.error('Order Error:', err.message);
            reply = `⚠️ Error while placing your order.`;
          }
          break;

        case 'RecommendRestaurant':
          try {
            const recommendations = await recommendService.getRecommendations(userId);
            reply = recommendations.length
              ? `🌟 Recommended Restaurants:\n${recommendations.map(r => `- ${r.name}`).join('\n')}`
              : '😕 Sorry, no recommendations found at the moment.';
          } catch (error) {
            console.error('Recommendation Error:', error.message);
            reply = '⚠️ Failed to get recommendations.';
          }
          break;

        case 'Greeting':
          reply = `👋 Hello! I can help you find restaurants, make reservations, place orders, or recommend great places. Just let me know what you need!`;
          break;

        default:
          reply = `🤖 Sorry, I didn’t understand that. Can you try rephrasing?`;
          break;
      }

      await context.sendActivity(reply);
      await next();
    });
  }
}

module.exports.RestaurantBot = RestaurantBot;

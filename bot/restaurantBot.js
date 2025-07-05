const { ActivityHandler } = require('botbuilder');
const getIntentFromCLU = require('../services/azureCLU');
const restaurantController = require('../controllers/restaurantController');
const orderController = require('../controllers/orderController');
const reservationController = require('../controllers/reservationController');

class RestaurantBot extends ActivityHandler {
  constructor() {
    super();

    // Simple in-memory conversation state
    this.conversationState = {};

    this.onMessage(async (context, next) => {
      const userId = context.activity.from.id;
      const userMessage = context.activity.text.trim();

      // Initialize conversation state if not present
      if (!this.conversationState[userId]) {
        this.conversationState[userId] = { step: null, data: {} };
      }

      const state = this.conversationState[userId];

      // 👉 Multi-turn Reservation Flow
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
        state.step = null; // Clear state after this

        const reservationData = {
          userId: 1, // Dummy user ID; replace with real session later
          restaurantId: 2, // Dummy restaurant; replace based on selection later
          date: state.data.date,
          time: state.data.time,
          guests: state.data.guests,
          specialRequest: ''
        };

        try {
          const result = await reservationController.makeReservation(reservationData);
          await context.sendActivity(`✅ Reservation confirmed for ${state.data.guests} guest(s) on ${state.data.date} at ${state.data.time}.\n🪪 Reservation ID: ${result.reservationId}`);
        } catch (error) {
          console.error('Reservation Error:', error);
          await context.sendActivity('❌ Sorry, something went wrong while booking your reservation.');
        }

        // Clear conversation state
        this.conversationState[userId] = { step: null, data: {} };
        return;
      }

      // Step 1: Detect Intent from Azure CLU
      const intent = await getIntentFromCLU(userMessage);
      let reply;

      // Step 2: Handle intents
      switch (intent) {
        case 'FindRestaurant':
          const results = await restaurantController.searchRestaurants(userMessage);
          reply = results.length > 0
            ? `🍽️ I found these restaurants:\n` + results.map(r => `- ${r.name}`).join('\n')
            : `😕 Sorry, I couldn't find any matching restaurants.`;
          break;

        case 'MakeReservation':
          state.step = 'awaiting_date';
          reply = '📅 Sure! What date would you like to make the reservation for? (e.g., 2025-07-10)';
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
              ? `✅ Your order has been placed successfully!\n🧾 Order ID: ${orderResult.orderId}`
              : `❌ Sorry, we couldn't place your order. Please try again.`;
          } catch (error) {
            console.error('Order Error:', error);
            reply = `⚠️ There was an error while placing your order.`;
          }
          break;

        case 'Greeting':
          reply = `👋 Hello! I'm your Restaurant Bot.\nYou can ask me to find restaurants, make reservations, or place an order.`;
          break;

        default:
          reply = `🤖 Sorry, I didn't understand that. Can you please rephrase?`;
          break;
      }

      // Step 3: Send reply
      await context.sendActivity(reply);
      await next();
    });
  }
}

module.exports.RestaurantBot = RestaurantBot;

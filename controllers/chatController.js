// controllers/chatController.js
const { getIntentFromCLU } = require('../services/azureCLU');

const handleChat = async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    const intent = await getIntentFromCLU(userMessage);

    let response;

    // Basic intent response logic
    switch (intent) {
      case 'BookTable':
        response = "Sure! I can help you book a table. Please provide date, time and number of people.";
        break;
      case 'ShowMenu':
        response = "Here is the menu: [Link or menu items]";
        break;
      case 'CancelReservation':
        response = "I can cancel your reservation. Please share your reservation ID.";
        break;
      default:
        response = "I'm sorry, I didn't understand that. Could you please rephrase?";
    }

    res.json({ intent, response });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleChat };

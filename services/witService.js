const axios = require('axios');

const getIntentFromCLU = async (message) => {
  const WIT_API_TOKEN = process.env.WIT_API_TOKEN;

  if (!WIT_API_TOKEN) {
    console.error('❌ Missing WIT_API_TOKEN in environment variables.');
    return { intent: 'None', entities: {} };
  }

  if (!message || typeof message !== 'string') {
    console.warn('⚠️ Invalid message input to CLU.');
    return { intent: 'None', entities: {} };
  }

  try {
    const response = await axios.get(
      `https://api.wit.ai/message?v=20240707&q=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: `Bearer ${WIT_API_TOKEN}`,
        },
      }
    );

    const data = response.data;

    const intent = data.intents?.[0]?.name || 'None';
    console.log(`🤖 Detected Intent: ${intent}`);

    const entities = {};

    if (data.entities['wit$datetime:datetime'] || data.entities['wit$datetime']) {
      const datetimeEntity = data.entities['wit$datetime:datetime'] || data.entities['wit$datetime'];
      const value = datetimeEntity[0]?.value || datetimeEntity[0]?.values?.[0]?.value;
      if (value) {
        const [datePart, timePart] = value.split('T');
        entities.date = datePart;
        entities.time = timePart?.substring(0, 5); // e.g., '18:00'
      }
    }

    if (data.entities['wit$number:number']) {
      const partySize = data.entities['wit$number:number'][0]?.value;
      if (partySize) {
        entities.partySize = parseInt(partySize);
      }
    }

    return { intent, entities };

  } catch (error) {
    console.error('❌ Wit.ai Error:', error.response?.data || error.message);
    return { intent: 'None', entities: {} };
  }
};

module.exports = getIntentFromCLU;

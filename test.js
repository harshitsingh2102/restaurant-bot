require('dotenv').config(); // ✅ Loads environment variables

const getIntentFromCLU = require('./services/witService'); // or update the path if needed

(async () => {
  const message = "I'd like to book a table for 2 tomorrow at 7 PM";
  const intent = await getIntentFromCLU(message);
  console.log("🔍 Intent from Wit.ai:", intent);
})();

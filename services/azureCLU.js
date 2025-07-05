// services/azureCLU.js

const axios = require('axios');

const endpoint = 'https://my-clu-resource.cognitiveservices.azure.com/';
const projectName = 'restaurant-bot';
const deploymentName = 'production';
const apiKey = 'abcd1234YOURREALAPIKEYHERE';

async function getIntentFromCLU(message) {
  try {
    const response = await axios.post(
      `${endpoint}language/:analyze-conversations?api-version=2022-10-01-preview`,
      {
        kind: "Conversation",
        analysisInput: {
          conversationItem: {
            id: "1",
            participantId: "user1",
            text: message
          }
        },
        parameters: {
          projectName,
          deploymentName,
          verbose: true
        }
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    const intent = response.data.result.prediction.topIntent;
console.log("🔍 CLU Top Intent:", intent);
console.log("🔍 Full CLU Response:", JSON.stringify(response.data, null, 2));
return intent;


  } catch (error) {
    console.error("CLU error:", error.message);
    return 'None';
  }
}

module.exports = getIntentFromCLU;

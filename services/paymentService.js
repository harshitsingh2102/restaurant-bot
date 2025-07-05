// services/paymentService.js

async function processPayment({ orderId, amount, userId }) {
  console.log(`💳 Processing payment for Order ID: ${orderId}, Amount: ₹${amount}, User ID: ${userId}`);

  // Simulate a delay (like calling Stripe API)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Dummy success logic
  const isSuccess = true;

  if (isSuccess) {
    console.log("✅ Payment successful!");
    return { success: true, transactionId: `TXN-${Date.now()}` };
  } else {
    console.log("❌ Payment failed.");
    return { success: false, error: "Payment declined" };
  }
}

module.exports = {
  processPayment
};

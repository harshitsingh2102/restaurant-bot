// services/paymentService.js

const generateUPIPayment = (amount, note = "Restaurant Bot Order") => {
  const upiId = "hs0801793@okhdfcbank"; // Replace with your real UPI ID
  const payeeName = "Restaurant Bot";
  
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  return {
    upiId,
    qrMessage: `📲 Please scan this UPI QR or use the link to pay ₹${amount}`,
    upiLink
  };
};

module.exports = {
  generateUPIPayment
};

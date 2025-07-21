# 🍽️ Restaurant Bot – AI-Powered Food Ordering & Reservation System

The **Restaurant Bot** is a full-stack AI-powered application that helps users discover restaurants, explore menus, make reservations, place orders, and securely pay – all through an intelligent chat-based interface. Perfect for modern digital dining experiences.

---

## 🚀 Features

- 🔍 **Restaurant Discovery**: Search by cuisine, location, price, or keywords.
- 📋 **Menu Exploration**: View digital menus with dish descriptions, images, and reviews.
- 📅 **Reservation Management**: Book tables by date, time, and special requests.
- 🛒 **Ordering Made Easy**: Place pickup/delivery orders, add/remove items.
- 💳 **Payment Integration**: Secure in-chat payments via Razorpay.
- 🚚 **Order Tracking**: Get real-time updates on order status.
- 🧾 **Table & Order Management**: Modify or cancel reservations/orders easily.
- 🎯 **Smart Recommendations**: Personalized dish/restaurant suggestions.

---

## 🛠️ Tech Stack

| Layer         | Technology                          |
|---------------|--------------------------------------|
| Backend       | Node.js, Express.js                  |
| Database      | MongoDB + Mongoose                   |
| Payments      | Razorpay API                         |
| Chatbot       | Azure Conversational Language Understanding (CLU) |
| Frontend      | React.js (planned)                   |
| Auth (API)    | JWT-based Authentication             |

---

## 📁 Project Structure

restaurant-bot/
├── bot/ # Azure CLU-based chatbot logic
├── controllers/ # Handles API logic for models
├── models/ # Mongoose models
├── routes/ # API routes (auth, orders, menus, etc.)
├── services/ # Razorpay, Recommendations, CLU, etc.
├── public/ # Frontend (basic HTML / will migrate to React)
├── utils/ # Logger and utility files
├── sql/ # (If any SQL-based legacy logic or exports)
├── .env # Environment variables
├── index.js # Entry point
├── db.js # DB Connection
└── README.md # This file

---

## 🔐 Environment Variables

Create a `.env` file in the root folder and add:

```env
PORT=3000
MONGODB_URI=your-mongodb-uri
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
AZURE_CLU_KEY=your-azure-clu-key
AZURE_CLU_ENDPOINT=your-azure-endpoint
🧪 API Testing (Postman Collection)
Import the provided Postman Collection to test:

/api/auth/register

/api/auth/login

/api/restaurants

/api/menus

/api/orders

/api/reservations

/api/payment

Make sure to use the JWT token from login for protected routes.
AI Integration
The bot uses Azure Conversational Language Understanding (CLU) to interpret user intent and map it to actions like:

Finding restaurants

Placing an order

Booking a reservation

Showing recommendations

Future Improvements
✅ React.js frontend for users/admin

✅ Admin dashboard to manage orders/reservations

✅ Real-time order status tracking (WebSocket or polling)

✅ Smart personalized recommendations using ML

Developed By
Harshit Singh
B.Tech – Information Technology
Intern @ Celebal Technologies

 License
This project is licensed under the MIT License.




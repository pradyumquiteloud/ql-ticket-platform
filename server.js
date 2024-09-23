"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Import dependencies
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Import custom routes and services
const TicketResource_1 = __importDefault(require("./routes/TicketResource"));
const PaymentWebhook_1 = __importDefault(require("./webhooks/PaymentWebhook"));
// 2. Initialize dotenv to load environment variables
dotenv_1.default.config();
// 3. Initialize express app
const app = (0, express_1.default)();
// 4. Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// 5. Routes
app.use('/api/ticketing', TicketResource_1.default); // Ticket resource routes
app.use('/webhooks/payment', PaymentWebhook_1.default); // Payment webhook
// 6. Error handling middleware (optional, add as needed)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
// 7. Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

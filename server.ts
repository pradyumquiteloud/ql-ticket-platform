// server.ts

// 1. Import dependencies
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import custom routes and services
import ticketRoutes from './routes/TicketResource';
import PaymentWebhook from './webhooks/PaymentWebhook';

// 2. Initialize dotenv to load environment variables
dotenv.config();

// 3. Initialize express app
const app = express();

// 4. Middleware
app.use(express.json());
app.use(cors());

// 5. Routes
app.use('/api/ticketing', ticketRoutes); // Ticket resource routes
app.use('/webhooks/payment', PaymentWebhook); // Payment webhook

// 6. Error handling middleware (optional, add as needed)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// 7. Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

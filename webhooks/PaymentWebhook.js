"use strict";
// webhooks/PaymentWebhook.ts
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentWebhook = (req, res) => {
    // Your webhook logic here
    res.status(200).send('Webhook received!');
};
exports.default = PaymentWebhook;

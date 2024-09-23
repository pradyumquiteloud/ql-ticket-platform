// webhooks/PaymentWebhook.ts

import { Request, Response } from 'express';

const PaymentWebhook = (req: Request, res: Response) => {
    // Your webhook logic here
    res.status(200).send('Webhook received!');
};

export default PaymentWebhook;

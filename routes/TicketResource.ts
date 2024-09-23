import express, { Request, Response } from 'express';
import { TicketService } from '../services/TicketService'; // Ensure this is correctly set up

const router = express.Router();

// POST /ticketing/generate-ticket
router.post('/generate-ticket', async (req: Request, res: Response) => {
  const { eventId, name, displayName, email, phoneNo, promoCode } = req.body;

  try {
    // Call the service method to start the ticket generation flow
    console.log("inside ticketResource");
    await TicketService.StartTicketGenerationFlow(eventId, name, displayName, email, phoneNo, promoCode);
    
    // Respond with a success message
    res.status(200).json({ message: 'Ticket generation initiated successfully.' });
  } catch (error) {
    console.error('Error initiating ticket generation:', error);
    res.status(500).json({ error: 'An error occurred while initiating ticket generation.' });
  }
});

export default router;

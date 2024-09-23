"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TicketService_1 = require("../services/TicketService"); // Ensure this is correctly set up
const router = express_1.default.Router();
// POST /ticketing/generate-ticket
router.post('/generate-ticket', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId, name, displayName, email, phoneNo, promoCode } = req.body;
    try {
        // Call the service method to start the ticket generation flow
        console.log("inside ticketResource");
        yield TicketService_1.TicketService.StartTicketGenerationFlow(eventId, name, displayName, email, phoneNo, promoCode);
        // Respond with a success message
        res.status(200).json({ message: 'Ticket generation initiated successfully.' });
    }
    catch (error) {
        console.error('Error initiating ticket generation:', error);
        res.status(500).json({ error: 'An error occurred while initiating ticket generation.' });
    }
}));
exports.default = router;

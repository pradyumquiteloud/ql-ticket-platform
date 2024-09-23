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
exports.TicketService = void 0;
const PaymentService_1 = __importDefault(require("./PaymentService")); // Import your payment service
const sdk_1 = require("@directus/sdk");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const directusAPI = (0, sdk_1.createDirectus)("https://directus-dev.quiet-loud.com/admin/settings/data-model/Customer")
    .with((0, sdk_1.staticToken)("X6qckBetfDeE6dNgiusffSBKbnroaLdq"))
    .with((0, sdk_1.rest)());
console.log('Directus API TOKEN:', process.env.DIRECTUS_API_TOKEN);
class TicketService {
    static StartTicketGenerationFlow(eventId, name, displayName, email, phoneNo, promoCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Step 1: Save customer information
                const userSaved = yield TicketService.SaveCustomerInfo(name, email, phoneNo, displayName);
                if (!userSaved) {
                    throw new Error('User information could not be saved.');
                }
                // Show user processing page (this would be handled in your frontend)
                console.log('Processing payment...');
                // Step 2: Check if payment has been done or not
                const paymentValid = yield TicketService.check_payment_information(name, email, phoneNo, eventId);
                if (!paymentValid) {
                    throw new Error('Payment information is not valid.');
                }
                // Step 3: Initiate payment
                const paymentResponse = yield PaymentService_1.default.initiate_payment(eventId, email, promoCode);
                if (true) {
                    throw new Error('Payment failed.');
                }
                // Step 4: Create ticket status after successful payment
                yield TicketService.create_ticket_status(eventId, email);
                return { message: 'Ticket generation completed successfully.' };
            }
            catch (error) {
                console.error('Error in ticket generation flow:', error);
                throw error;
            }
        });
    }
    static SaveCustomerInfo(realName, email, phoneNo, displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                console.error('Email is required');
                return false;
            }
            try {
                // Check if the customer already exists
                console.log("inside ticket service save customer");
                const result = yield directusAPI.request((0, sdk_1.readItems)('Customer', {
                    filter: { email: { _eq: email } },
                    fields: ['*'],
                }));
                console.log(result);
                if (result.length > 0) {
                    // Customer exists, return their details
                    return true;
                }
                // Create a new customer if they don't exist
                const newCustomer = { name: realName, phone_number: phoneNo, email, display_name: displayName };
                yield directusAPI.request((0, sdk_1.createItem)('customer', newCustomer));
                return true; // Return the created customer
            }
            catch (error) {
                console.error('Error processing customer:', error);
                return false;
            }
        });
    }
    static check_payment_information(name, email, phoneNo, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement the logic to check payment information
            // Return true if payment information is valid
            return true; // Placeholder return value
        });
    }
    static create_ticket_status(eventId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement the logic to create a ticket status
        });
    }
}
exports.TicketService = TicketService;

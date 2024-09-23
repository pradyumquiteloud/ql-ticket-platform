import axios from 'axios';
import PaymentService from './PaymentService'; // Import your payment service
import { createDirectus, staticToken, rest, readItems, createItem } from '@directus/sdk';
import dotenv from 'dotenv';
dotenv.config();

const directusAPI = createDirectus("https://directus-dev.quiet-loud.com/admin/settings/data-model/Customer")
    .with(staticToken("X6qckBetfDeE6dNgiusffSBKbnroaLdq"))
    .with(rest());

console.log('Directus API TOKEN:', process.env.DIRECTUS_API_TOKEN);

interface CustomerInfo {
    name: string;
    email: string;
    phone_number: string;
    display_name: string;
}

class TicketService {
    static async StartTicketGenerationFlow(
        eventId: string,
        name: string,
        displayName: string,
        email: string,
        phoneNo: string,
        promoCode?: string
    ): Promise<{ message: string }> {
        try {
            // Step 1: Save customer information
            const userSaved = await TicketService.SaveCustomerInfo(name, email, phoneNo, displayName);
            if (!userSaved) {
                throw new Error('User information could not be saved.');
            }

            // Show user processing page (this would be handled in your frontend)
            console.log('Processing payment...');


            // Step 2: Create ticket status after successful payment
            const price = 20;
            const result = await TicketService.create_ticket_status(eventId, email, price);


            // Step 3: Initiate payment
            if (result && result.payment_status === false) {
                const paymentResponse = await PaymentService.initiate_payment(eventId, email, price);
            }
            
            if (true) {
                 throw new Error('Payment failed.');
             }

            return { message: 'Ticket generation completed successfully.' };
        } catch (error) {
            console.error('Error in ticket generation flow:', error);
            throw error;
        }
    }

    static async SaveCustomerInfo(realName: string, email: string, phoneNo: string, displayName: string): Promise<boolean> {
        if (!email) {
            console.error('Email is required');
            return false;
        }

        try {
            // Check if the customer already exists
            console.log("inside ticket service save customer")
            const result = await directusAPI.request(
                readItems('Customer', {
                    filter: { email: { _eq: email } },
                    fields: ['*'],
                })
            );
            console.log(result)
            if (result.length > 0) {
                // Customer exists, return their details
                return true;
            }

            // Create a new customer if they don't exist
            const newCustomer: CustomerInfo = { name: realName, phone_number: phoneNo, email, display_name: displayName };
            await directusAPI.request(createItem('customer', newCustomer));
            return true; // Return the created customer
        } catch (error) {
            console.error('Error processing customer:', error);
            return false;
        }
    }

    static async check_payment_information(name: string, email: string, phoneNo: string, eventId: string): Promise<boolean> {
        // Implement the logic to check payment information
        // Return true if payment information is valid
        return true; // Placeholder return value
    }

    static async create_ticket_status(eventId: string, email: string, price: number): Promise<object | false> {
        try {
            // Check if the ticket already exists using email and eventId
            const result = await directusAPI.request(
                readItems('tickets', {
                    filter: { email: { _eq: email }, event_id: { _eq: eventId } },
                    fields: ['*'],
                })
            );
    
            if (result && result.length > 0 && result[0].id) {
                return result[0]; // Ticket exists, return the existing ticket object
            }
    
            // Create a new ticket if it doesn't exist
            const newTicket = { email, event_id: eventId, price, payment_status: false };
            await directusAPI.request(createItem('tickets', newTicket));
    
            return newTicket; // Ticket created, return the new ticket object
        } catch (error) {
            console.error('Error processing ticket:', error);
            return false; // Return false on error
        }
    }

}
    

export { TicketService };
  
import { Ticket } from '@edtrServices/apollo/types';

const isSoldOut = (ticket: Ticket): boolean => ticket.quantity <= ticket.sold;

export default isSoldOut;

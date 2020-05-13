import { isBooleanTrue } from '@appServices/utilities';
import { Ticket } from '@edtrServices/apollo/types';

const isSoldOut = (ticket: Ticket): boolean => isBooleanTrue(ticket.isSoldOut) || (
	isFinite(ticket.quantity)
	&& ticket.quantity > -1
	&& ticket.quantity <= ticket.sold
);

export default isSoldOut;

import { Ticket } from '@edtrServices/apollo/types';
import { isValidOrTrashed } from '../../../../services/predicates';

const isSoldOut = (ticket: Ticket): boolean => {
	const { quantity, sold } = ticket;

	return isValidOrTrashed(ticket) && isFinite(quantity) && quantity <= sold;
};

export default isSoldOut;

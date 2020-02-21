import { is } from 'ramda';

import { Ticket } from '@edtrServices/apollo/types';
import { isValidOrTrashed } from '../../../../services/predicates';

const isSoldOut = (ticket: Ticket): boolean => {
	const { quantity, sold } = ticket;

	return isValidOrTrashed(ticket) && is(Number, quantity) && isFinite(quantity) && quantity <= sold;
};

export default isSoldOut;

import { parseISO } from 'date-fns';

import { diff } from '../../../../../../application/services/utilities/date';
import { isValidOrTrashed } from '../../../../services/predicates';
import { now } from '../filters';
import { Ticket } from '@edtrServices/apollo/types';

const isOnSale = (ticket: Ticket): boolean => {
	return (
		isValidOrTrashed(ticket) &&
		diff('minutes', parseISO(ticket.startDate), now) < 0 &&
		diff('minutes', parseISO(ticket.endDate), now) > 0
	);
};

export default isOnSale;

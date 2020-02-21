/**
 * External dependencies
 */
import { parseISO, formatISO } from 'date-fns';

import { diff } from '../../../../../../application/services/utilities/date';
import { isValidOrTrashed } from '../../../../services/predicates';
import { now } from '../filters';
import { Ticket } from '@edtrServices/apollo/types';

const isOnSale = (ticket: Ticket): boolean => {
	// make sure the dates are prepared by same functions to
	// avoid timezone differences
	const dateNow = parseISO(formatISO(now));
	return (
		isValidOrTrashed(ticket) &&
		diff('minutes', parseISO(ticket.startDate), now) < 0 &&
		diff('minutes', parseISO(ticket.endDate), dateNow) > 0
	);
};

export default isOnSale;

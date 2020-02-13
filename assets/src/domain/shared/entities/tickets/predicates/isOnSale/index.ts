/**
 * External dependencies
 */
import { parseISO, formatISO } from 'date-fns';

import { now } from '../filters';
import { Ticket } from '@edtrServices/apollo/types';
import { diff } from '../../../../../../application/services/utilities/date';

const isOnSale = ({ startDate, endDate }: Ticket): boolean => {
	// make sure the dates are prepared by same functions to
	// avoid timezone differences
	const dateNow = parseISO(formatISO(now));
	return diff('minutes', parseISO(startDate), now) < 0 && diff('minutes', parseISO(endDate), dateNow) > 0;
};

export default isOnSale;

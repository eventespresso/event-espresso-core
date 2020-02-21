import { parseISO, formatISO } from 'date-fns';

import { diff } from '../../../../../../application/services/utilities/date';
import { isValidOrTrashed } from '../../../../services/predicates';
import { now } from '../filters';
import { Ticket } from '@edtrServices/apollo/types';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
const isPending = (ticket: Ticket): boolean => {
	return isValidOrTrashed(ticket) && diff('minutes', parseISO(ticket.startDate), parseISO(formatISO(now))) > 0;
};

export default isPending;

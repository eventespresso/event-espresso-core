import { parseISO } from 'date-fns';

import { diff, isBooleanTrue } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';
import { Ticket } from '@edtrServices/apollo/types';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
const isPending = (ticket: Ticket): boolean =>
	isBooleanTrue(ticket.isPending) || diff('minutes', parseISO(ticket.startDate), now) > 0;

export default isPending;

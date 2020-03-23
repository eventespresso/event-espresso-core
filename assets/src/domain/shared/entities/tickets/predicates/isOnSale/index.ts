import { parseISO } from 'date-fns';

import { diff, isBooleanTrue } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';
import { Ticket } from '@edtrServices/apollo/types';

const isOnSale = (ticket: Ticket): boolean =>
	isBooleanTrue(ticket.isOnSale) ||
	(diff('minutes', parseISO(ticket.startDate), now) < 0 && diff('minutes', parseISO(ticket.endDate), now) > 0);

export default isOnSale;

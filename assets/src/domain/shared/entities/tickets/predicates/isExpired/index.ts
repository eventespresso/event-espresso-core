import { parseISO } from 'date-fns';

import { diff, isBooleanTrue } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';
import { Ticket } from '@edtrServices/apollo/types';

const isExpired = (ticket: Ticket): boolean =>
	isBooleanTrue(ticket.isExpired) || diff('minutes', parseISO(ticket.endDate), now) < 0;

export default isExpired;

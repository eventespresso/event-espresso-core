import { parseISO } from 'date-fns';

import { now } from './filters';
import isValidOrTrashed from './isValidOrTrashed';
import { Ticket } from '../../../../eventEditor/services/apollo/types';
import { diff } from '../../../../../application/services/utilities/date';

const isExpired = (ticket: Ticket, includeTrashed = false): boolean => {
	const { endDate } = ticket;

	return isValidOrTrashed(ticket, includeTrashed) && diff('minutes', parseISO(endDate), now) < 0;
};

export default isExpired;

/**
 * External dependencies
 */
import { differenceInMinutes, parseISO } from 'date-fns';
import { now } from './filters';

/**
 * Internal dependencies
 */
import isValidOrTrashed from './isValidOrTrashed';
import { Ticket } from '../../../../../../prototype/domain/eventEditor/data/types';

const isExpired = (ticket: Ticket, includeTrashed = false): boolean => {
	const { endDate } = ticket;

	return isValidOrTrashed(ticket, includeTrashed) && differenceInMinutes(parseISO(endDate), now) < 0;
};

export default isExpired;

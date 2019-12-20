/**
 * External dependencies
 */
import { differenceInMinutes } from 'date-fns';
import { now } from './filters';

/**
 * Internal dependencies
 */
import isValidEntityOrArchive from './isValidEntityOrArchive';

interface Ticket {
	endDate: Date;
	startDate: Date;
}

const isExpired = (ticket: Ticket, includeArchived: boolean = false): boolean => {
	const { endDate } = ticket;

	return isValidEntityOrArchive(ticket, includeArchived) && differenceInMinutes(endDate, now) < 0;
};

export default isExpired;

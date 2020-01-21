/**
 * External dependencies
 */
import { differenceInMinutes, parseISO } from 'date-fns';
import { now } from './filters';

/**
 * Internal dependencies
 */
import isValidEntityOrArchive from './isValidEntityOrArchive';
import { Ticket } from '../../../../eventEditor/data/types';

const isExpired = (ticket: Ticket, includeArchived = false): boolean => {
	const { endDate } = ticket;

	return isValidEntityOrArchive(ticket, includeArchived) && differenceInMinutes(parseISO(endDate), now) < 0;
};

export default isExpired;

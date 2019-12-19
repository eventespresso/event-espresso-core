/**
 * External dependencies
 */
import { differenceInMinutes } from 'date-fns';
import { now } from './filters';

/**
 * Internal dependencies
 */
import isValidEntityOrArchive from './isValidEntityOrArchive';

interface TicketEntity {
	endDate: Date;
	startDate: Date;
}

const isExpired = (ticketEntity: TicketEntity, includeArchived: boolean = false): boolean => {
	const { endDate } = ticketEntity;

	return isValidEntityOrArchive(ticketEntity, includeArchived) && differenceInMinutes(endDate, now) < 0;
};

export default isExpired;

/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {Object} dateEntity
 * @param {number} dateCount
 * @param {number} unfilteredDatesCount
 * @param {boolean} showArchivedDates
 * @param {boolean} showExpiredDates
 * @return {boolean} true if filters should be shown
 */
export const getShowDateFilters = (
	dateEntity,
	dateCount,
	unfilteredDatesCount,
	showArchivedDates,
	showExpiredDates
) => {
	if ( isModelEntityOfModel( dateEntity, 'datetime' ) ) {
		return false;
	}
	let showDateFilters = dateCount !== unfilteredDatesCount ||
		(
			dateCount === unfilteredDatesCount &&
			(
				showArchivedDates || showExpiredDates
			)
		);
	if (
		dateCount === 1 &&
		! (
			showArchivedDates || showExpiredDates
		)
	) {
		showDateFilters = false;
	}
	return showDateFilters;
};

/**
 * @function
 * @param {Object} ticketEntity
 * @param {number} ticketCount
 * @param {number} unfilteredTicketCount
 * @param {boolean} showArchivedTickets
 * @param {boolean} showExpiredTickets
 * @return {boolean} true if filters should be shown
 */
export const getShowTicketFilters = (
	ticketEntity,
	ticketCount,
	unfilteredTicketCount,
	showArchivedTickets,
	showExpiredTickets
) => {
	if ( isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
		return false;
	}
	let showTicketFilters = ticketCount !== unfilteredTicketCount || (
		ticketCount === unfilteredTicketCount &&
		(
			showArchivedTickets || showExpiredTickets
		)
	);
	if (
		ticketCount === 1 &&
		! (
			showArchivedTickets || showExpiredTickets
		)
	) {
		showTicketFilters = false;
	}
	return showTicketFilters;
};

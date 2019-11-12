/**
 * @function
 * @param {boolean} forSingleDate
 * @param {number} dateCount
 * @param {number} unfilteredDatesCount
 * @param {boolean} showArchivedDates
 * @param {boolean} showExpiredDates
 * @return {boolean} true if filters should be shown
 */
export const getShowDateFilters = (
	forSingleDate,
	dateCount,
	unfilteredDatesCount,
	showArchivedDates,
	showExpiredDates
) => {
	if ( forSingleDate ) {
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
 * @param {boolean} forSingleTicket
 * @param {number} ticketCount
 * @param {number} unfilteredTicketCount
 * @param {boolean} showArchivedTickets
 * @param {boolean} showExpiredTickets
 * @return {boolean} true if filters should be shown
 */
export const getShowTicketFilters = (
	forSingleTicket,
	ticketCount,
	unfilteredTicketCount,
	showArchivedTickets,
	showExpiredTickets
) => {
	if ( forSingleTicket ) {
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

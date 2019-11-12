/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';

/**
 * Internal imports
 */
import DateFilters from './date-filters';
import FilterNotice from './filter-notice';
import TicketFilters from './ticket-filters';
import { getShowDateFilters, getShowTicketFilters } from './helpers';

const { FormRow } = twoColumnAdminFormLayout;

/**
 * filters for toggling display of archived and expired entities
 *
 * @function
 * @param {Function} setFilter
 * @param {Object} filterState
 * @param {boolean} forSingleDate
 * @param {boolean} forSingleTicket
 * @param {number} unfilteredDatesCount
 * @param {number} unfilteredTicketCount
 * @param {number} filteredDatesCount
 * @param {number} filteredTicketsCount
 * @return {Object} rendered date filter toggles
 */
const TicketAssignmentsFilters = ( {
	setFilter,
	filterState,
	forSingleDate,
	forSingleTicket,
	unfilteredDatesCount,
	unfilteredTicketCount,
	filteredDatesCount,
	filteredTicketsCount,
} ) => {
	const showFilterNotice = filteredDatesCount < 1 || filteredTicketsCount < 1;

	const showDateFilters = useMemo(
		() => getShowDateFilters(
			forSingleDate,
			filteredDatesCount,
			unfilteredDatesCount,
			filterState.showArchivedDates,
			filterState.showExpiredDates
		),
		[
			forSingleDate,
			filteredDatesCount,
			unfilteredDatesCount,
			filterState.showArchivedDates,
			filterState.showExpiredDates,
		]
	);
	const showTicketFilters = useMemo(
		() => getShowTicketFilters(
			forSingleTicket,
			filteredTicketsCount,
			unfilteredTicketCount,
			filterState.showArchivedTickets,
			filterState.showExpiredTickets
		),
		[
			forSingleTicket,
			filteredTicketsCount,
			unfilteredTicketCount,
			filterState.showArchivedTickets,
			filterState.showExpiredTickets,
		]
	);
	const dateFiltersOffset = showDateFilters && showTicketFilters ? 2 : 7;
	const ticketFiltersOffset = showDateFilters && showTicketFilters ? 0 : 7;
	const filterNotice = useMemo(
		() => showFilterNotice ? (
			<FilterNotice dateFiltersOffset={ dateFiltersOffset } />
		) : null,
		[ showFilterNotice, dateFiltersOffset ]
	);
	return (
		<div className={ 'ee-ticket-assignments-manager-filters' }>
			<FormRow>
				<DateFilters
					showDateFilters={ showDateFilters }
					showArchivedDates={ filterState.showArchivedDates }
					showExpiredDates={ filterState.showExpiredDates }
					dateFiltersOffset={ dateFiltersOffset }
					setFilter={ setFilter }
				/>
				<TicketFilters
					showTicketFilters={ showTicketFilters }
					showArchivedTickets={ filterState.showArchivedTickets }
					showExpiredTickets={ filterState.showExpiredTickets }
					ticketFiltersOffset={ ticketFiltersOffset }
					setFilter={ setFilter }
				/>
			</FormRow>
			{ filterNotice }
		</div>
	);
};

export default TicketAssignmentsFilters;

/**
 * External imports
 */
import { Fragment, useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';

/**
 * Internal imports
 */
import DateFilters from './date-filters';
import FilterNotice from './filter-notice';
import TicketFilters from './ticket-filters';

const { FormRow } = twoColumnAdminFormLayout;

/**
 * filters for toggling display of archived and expired entities
 *
 * @function
 * @param {boolean} showDateFilters
 * @param {boolean} showArchivedDates
 * @param {boolean} showExpiredDates
 * @param {Function} toggleArchivedDates
 * @param {Function} toggleExpiredDates
 * @param {boolean} showTicketFilters
 * @param {boolean} showArchivedTickets
 * @param {boolean} showExpiredTickets
 * @param {Function} toggleArchivedTickets
 * @param {Function} toggleExpiredTickets
 * @param {boolean} showFilterNotice
 * @return {Object} rendered date filter toggles
 */
const TicketAssignmentsFilters = ( {
	showDateFilters,
	showArchivedDates,
	showExpiredDates,
	toggleArchivedDates,
	toggleExpiredDates,
	showTicketFilters,
	showArchivedTickets,
	showExpiredTickets,
	toggleArchivedTickets,
	toggleExpiredTickets,
	showFilterNotice,
} ) => {
	const dateFiltersOffset = showDateFilters && showTicketFilters ? 2 : 7;
	const ticketFiltersOffset = showDateFilters && showTicketFilters ? 0 : 7;
	const dateFilters = useMemo(
		() => showDateFilters ? (
			<DateFilters
				showArchivedDates={ showArchivedDates }
				showExpiredDates={ showExpiredDates }
				toggleArchivedDates={ toggleArchivedDates }
				toggleExpiredDates={ toggleExpiredDates }
				dateFiltersOffset={ dateFiltersOffset }
			/>
		) : null,
		[
			showDateFilters,
			showArchivedDates,
			showExpiredDates,
			toggleArchivedDates,
			toggleExpiredDates,
			dateFiltersOffset,
		]
	);
	const ticketFilters = useMemo(
		() => showTicketFilters ? (
			<TicketFilters
				showArchivedTickets={ showArchivedTickets }
				showExpiredTickets={ showExpiredTickets }
				toggleArchivedTickets={ toggleArchivedTickets }
				toggleExpiredTickets={ toggleExpiredTickets }
				ticketFiltersOffset={ ticketFiltersOffset }
			/>
		) : null,
		[
			showArchivedTickets,
			showExpiredTickets,
			toggleArchivedTickets,
			toggleExpiredTickets,
			ticketFiltersOffset,
		]
	);
	const filterNotice = useMemo(
		() => showFilterNotice ? (
			<FilterNotice dateFiltersOffset={ dateFiltersOffset } />
		) : null,
		[ dateFiltersOffset ]
	);
	return useMemo(
		() => (
			<Fragment>
				<FormRow>
					{ dateFilters }
					{ ticketFilters }
				</FormRow>
				{ filterNotice }
			</Fragment>
		),
		[ dateFilters, ticketFilters, filterNotice ]
	);
};

export default TicketAssignmentsFilters;

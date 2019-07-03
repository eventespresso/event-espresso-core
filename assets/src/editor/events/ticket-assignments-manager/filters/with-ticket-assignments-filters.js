/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useCallback, useReducer } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';

/**
 * Internal imports
 */
import {
	showArchivedDatesAction,
	showExpiredDatesAction,
	showArchivedTicketsAction,
	showExpiredTicketsAction,
} from './actions';
import { DEFAULT_FILTER_STATE } from './constants';
import { filterDates, filterTickets } from './filters';
import { getShowDateFilters, getShowTicketFilters } from './helpers';
import DateFilters from './date-filters';
import FilterNotice from './filter-notice';
import TicketFilters from './ticket-filters';
import filterReducer from './reducer';

const { FormRow } = twoColumnAdminFormLayout;

/*
 * Enhanced TicketAssignments with filters for
 * toggling display of archived and expired entities
 */
const withTicketAssignmentsFilters = createHigherOrderComponent(
	( WrappedComponent ) => ( {
		dateEntity,
		dateEntities,
		ticketEntity,
		ticketEntities,
		...otherProps
	} ) => {
		const [ filterState, setFilter ] = useReducer(
			filterReducer,
			DEFAULT_FILTER_STATE
		);
		const {
			showArchivedDates,
			showExpiredDates,
			showArchivedTickets,
			showExpiredTickets,
		} = filterState;
		const unfilteredDatesCount = dateEntities.length;
		const unfilteredTicketCount = ticketEntities.length;
		const filterDateEntities = useCallback(
			() => dateEntity ?
				[ dateEntity ] :
				filterDates(
					dateEntities,
					showArchivedDates,
					showExpiredDates
				),
			[ dateEntity, dateEntities, showArchivedDates, showExpiredDates ]
		);
		const filterTicketEntities = useCallback(
			() => ticketEntity ?
				[ ticketEntity ] :
				filterTickets(
					ticketEntities,
					showArchivedTickets,
					showExpiredTickets
				),
			[
				ticketEntity,
				ticketEntities,
				showArchivedTickets,
				showExpiredTickets,
			]
		);
		const filteredDateEntities = filterDateEntities();
		const filteredTicketEntities = filterTicketEntities();
		const showDateFilters = useCallback(
			() => getShowDateFilters(
				dateEntity,
				filteredDateEntities.length,
				unfilteredDatesCount,
				showArchivedDates,
				showExpiredDates
			),
			[
				dateEntity,
				filteredDateEntities,
				unfilteredDatesCount,
				showArchivedDates,
				showExpiredDates,
			]
		);
		const showTicketFilters = useCallback(
			() => getShowTicketFilters(
				ticketEntity,
				filteredTicketEntities.length,
				unfilteredTicketCount,
				showArchivedTickets,
				showExpiredTickets
			),
			[
				ticketEntity,
				filteredTicketEntities,
				unfilteredTicketCount,
				showArchivedTickets,
				showExpiredTickets,
			]
		);
		const ticketAssignmentsFilters = (
			<Fragment>
				<FormRow>
					<DateFilters
						showArchivedDates={ showArchivedDates }
						showExpiredDates={ showExpiredDates }
						toggleArchivedDates={
							() => setFilter( showArchivedDatesAction )
						}
						toggleExpiredDates={
							() => setFilter( showExpiredDatesAction )
						}
						showDateFilters={ showDateFilters() }
						showTicketFilters={ showTicketFilters() }
					/>
					<TicketFilters
						showArchivedTickets={ showArchivedTickets }
						showExpiredTickets={ showExpiredTickets }
						toggleArchivedTickets={
							() => setFilter( showArchivedTicketsAction )
						}
						toggleExpiredTickets={
							() => setFilter( showExpiredTicketsAction )
						}
						showDateFilters={ showDateFilters() }
						showTicketFilters={ showTicketFilters() }
					/>
				</FormRow>
				<FilterNotice
					dateCount={ filteredDateEntities.length }
					ticketCount={ filteredTicketEntities.length }
					showDateFilters={ showDateFilters() }
					showTicketFilters={ showTicketFilters() }
				/>
			</Fragment>
		);
		return <WrappedComponent
			{ ...otherProps }
			dateEntities={ filteredDateEntities }
			ticketEntities={ filteredTicketEntities }
			ticketAssignmentsFilters={ ticketAssignmentsFilters }
		/>;
	},
	'withTicketAssignmentsFilters'
);

export default withTicketAssignmentsFilters;

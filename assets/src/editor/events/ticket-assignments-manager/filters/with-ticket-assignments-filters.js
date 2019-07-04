/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { useCallback, useMemo, useReducer } from '@wordpress/element';

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
import TicketAssignmentsFilters from './ticket-assignments-filters';
import filterReducer from './reducer';

/*
 * Enhanced TicketAssignments with filters for
 * toggling display of archived and expired entities
 * with state management
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
		const toggleArchivedDates = useCallback(
			() => setFilter( showArchivedDatesAction ),
			[]
		);
		const toggleExpiredDates = useCallback(
			() => setFilter( showExpiredDatesAction ),
			[]
		);
		const toggleArchivedTickets = useCallback(
			() => setFilter( showArchivedTicketsAction ),
			[]
		);
		const toggleExpiredTickets = useCallback(
			() => setFilter( showExpiredTicketsAction ),
			[]
		);
		const unfilteredDatesCount = dateEntities.length;
		const unfilteredTicketCount = ticketEntities.length;
		const filteredDateEntities = useMemo(
			() => dateEntity ?
				[ dateEntity ] :
				filterDates(
					dateEntities,
					showArchivedDates,
					showExpiredDates
				),
			[ dateEntity, dateEntities, showArchivedDates, showExpiredDates ]
		);
		const filteredTicketEntities = useMemo(
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
		const datesCount = filteredDateEntities.length;
		const ticketCount = filteredTicketEntities.length;

		const showDateFilters = useMemo(
			() => getShowDateFilters(
				dateEntity,
				datesCount,
				unfilteredDatesCount,
				showArchivedDates,
				showExpiredDates
			),
			[
				dateEntity,
				datesCount,
				unfilteredDatesCount,
				showArchivedDates,
				showExpiredDates,
			]
		);
		const showTicketFilters = useMemo(
			() => getShowTicketFilters(
				ticketEntity,
				ticketCount,
				unfilteredTicketCount,
				showArchivedTickets,
				showExpiredTickets
			),
			[
				ticketEntity,
				ticketCount,
				unfilteredTicketCount,
				showArchivedTickets,
				showExpiredTickets,
			]
		);
		const ticketAssignmentsFilters = useMemo(
			() => (
				<TicketAssignmentsFilters
					showDateFilters={ showDateFilters }
					showArchivedDates={ showArchivedDates }
					showExpiredDates={ showExpiredDates }
					toggleArchivedDates={ toggleArchivedDates }
					toggleExpiredDates={ toggleExpiredDates }
					showTicketFilters={ showTicketFilters }
					showArchivedTickets={ showArchivedTickets }
					showExpiredTickets={ showExpiredTickets }
					toggleArchivedTickets={ toggleArchivedTickets }
					toggleExpiredTickets={ toggleExpiredTickets }
					showFilterNotice={ datesCount < 1 || ticketCount < 1 }
				/>
			),
			[
				showDateFilters,
				showArchivedDates,
				showExpiredDates,
				showTicketFilters,
				showArchivedTickets,
				showExpiredTickets,
				datesCount,
				ticketCount,
			]
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

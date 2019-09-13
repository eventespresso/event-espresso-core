/**
 * External imports
 */
import { useMemo, useReducer } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import filterReducer from './reducer';
import { DEFAULT_FILTER_STATE } from './constants';
import { filterDates, filterTickets } from './filters';

/**
 * filters for toggling display of archived and expired entities
 *
 * @function
 * @param {BaseEntity} dateEntity
 * @param {BaseEntity[]} dateEntities
 * @param {BaseEntity} ticketEntity
 * @param {BaseEntity[]} ticketEntities
 * @return {Object} rendered date filter toggles
 */
const useTicketAssignmentsFilters = ( {
	dateEntity,
	dateEntities = [],
	ticketEntity,
	ticketEntities = [],
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
	return {
		setFilter,
		filterState,
		forSingleDate: isModelEntityOfModel( dateEntity, 'datetime' ),
		forSingleTicket: isModelEntityOfModel( ticketEntity, 'ticket' ),
		filteredDateEntities,
		filteredTicketEntities,
		unfilteredDatesCount: Array.isArray( dateEntities ) ?
			dateEntities.length :
			0,
		unfilteredTicketCount: Array.isArray( ticketEntities ) ?
			ticketEntities.length :
			0,
		filteredDatesCount: Array.isArray( filteredDateEntities ) ?
			filteredDateEntities.length :
			0,
		filteredTicketsCount: Array.isArray( filteredTicketEntities ) ?
			filteredTicketEntities.length :
			0,
	};
};

export default useTicketAssignmentsFilters;

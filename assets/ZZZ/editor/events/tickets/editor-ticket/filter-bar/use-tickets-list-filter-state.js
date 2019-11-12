/**
 * External imports
 */
import { useSelect } from '@wordpress/data';

const EMPTY_ARRAY = [];

/**
 * provides state management for TicketsListFilterBar component
 *
 * @param {string} listId
 * @param {string} defaultShowTickets
 * @param {string} defaultTicketsSortedBy
 * @param {string} defaultDisplayTicketDate
 * @param {boolean} defaultIsChained
 * @return {Object} tickets list filter state getters
 */
const useTicketsListFilterState = ( {
	listId,
	defaultShowTickets = 'on-sale-and-pending',
	defaultTicketsSortedBy = 'chronologically',
	defaultDisplayTicketDate = 'start',
	defaultIsChained = true,
} ) => useSelect( ( select ) => {
	const store = select( 'eventespresso/filter-state' );
	return {
		showTickets: store.getFilter(
			listId,
			'showTickets',
			defaultShowTickets
		),
		ticketsSortedBy: store.getFilter(
			listId,
			'ticketsSortedBy',
			defaultTicketsSortedBy
		),
		displayTicketDate: store.getFilter(
			listId,
			'displayTicketDate',
			defaultDisplayTicketDate
		),
		isChained: store.getFilter(
			listId,
			'isChained',
			defaultIsChained
		),
		filteredTicketIds: store.getFilter(
			listId,
			'filteredTicketIds',
			EMPTY_ARRAY
		),
	};
}, [
	listId,
	defaultShowTickets,
	defaultTicketsSortedBy,
	defaultDisplayTicketDate,
	defaultIsChained,
] );

export default useTicketsListFilterState;

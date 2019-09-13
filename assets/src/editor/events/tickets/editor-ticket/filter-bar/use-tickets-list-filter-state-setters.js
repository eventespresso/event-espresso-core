/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';

const useTicketsListFilterStateSetters = ( listId ) => {
	const store = useDispatch( 'eventespresso/filter-state' );
	return {
		setShowTickets: ( showTickets ) => store.setFilter(
			listId,
			'showTickets',
			showTickets
		),
		setTicketsSortedBy: ( ticketsSortedBy ) => store.setFilter(
			listId,
			'ticketsSortedBy',
			ticketsSortedBy
		),
		setDisplayTicketDate: ( displayTicketDate ) => store
			.setFilter(
				listId,
				'displayTicketDate',
				displayTicketDate
			),
		setIsChained: ( isChained ) => store.setFilter(
			listId,
			'isChained',
			!! isChained
		),
		setFilteredTickets: ( ticketIds ) => store.setFilter(
			listId,
			'filteredTicketIds',
			ticketIds
		),
	};
};

export default useTicketsListFilterStateSetters;

/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useMemo } from '@wordpress/element';
import { useFilterEntitiesBySearchText } from '@eventespresso/components';

import {
	filterTicketEntities,
	sortTicketEntitiesList,
} from './tickets-list-entity-filter-utils';

const EMPTY_ARRAY = [];

const useFilteredTicketsList = ( {
	ticketEntities,
	searchText,
	showTickets,
	ticketsSortedBy,
} ) => {
	const tickets = Array.isArray( ticketEntities ) ?
		ticketEntities :
		EMPTY_ARRAY;
	const searchedTickets = useFilterEntitiesBySearchText(
		tickets,
		searchText
	);
	const filteredTickets = useMemo( () => {
		return showTickets && ! isEmpty( searchedTickets ) ?
			filterTicketEntities( searchedTickets, showTickets ) :
			EMPTY_ARRAY;
	}, [ searchedTickets, showTickets ] );
	return useMemo( () => {
		return ticketsSortedBy && filteredTickets !== EMPTY_ARRAY ?
			sortTicketEntitiesList( filteredTickets, ticketsSortedBy ) :
			EMPTY_ARRAY;
	}, [ filteredTickets, ticketsSortedBy ] );
};

export default useFilteredTicketsList;

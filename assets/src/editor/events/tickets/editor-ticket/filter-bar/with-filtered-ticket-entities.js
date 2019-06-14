/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal imports
 */
import {
	getFilteredTicketEntitiesList,
} from './with-ticket-entities-list-filter-bar';

const withFilteredTicketEntities = createHigherOrderComponent(
	( WrappedComponent ) => ( {
		filteredTicketEntities,
		ticketEntities,
		ticketEntitiesLoaded,
		isChained,
		showTickets,
		ticketsSortedBy,
		...otherProps
	} ) => {
		if ( ticketEntitiesLoaded ) {
			filteredTicketEntities = isChained ?
				filteredTicketEntities :
				ticketEntities;
			filteredTicketEntities = getFilteredTicketEntitiesList(
				filteredTicketEntities,
				showTickets,
				ticketsSortedBy
			);
		}
		return <WrappedComponent
			allTicketEntities={ ticketEntities }
			filteredTicketEntities={ filteredTicketEntities }
			ticketEntitiesLoaded={ ticketEntitiesLoaded }
			isChained={ isChained }
			showTickets={ showTickets }
			ticketsSortedBy={ ticketsSortedBy }
			{ ...otherProps }
		/>;
	},
	'withFilteredTicketEntities'
);

export default withFilteredTicketEntities;

/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { Component, Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@eventespresso/i18n';
import { EntityListFilterBar } from '@eventespresso/higher-order-components';

/**
 * Internal dependencies
 */
import {
	filterTicketEntities,
	searchTicketEntities,
	sortTicketEntitiesList,
} from './ticket-entities-list-filter-utils';
import { default as TicketEntityListFilterBar } from './ticket-entities-list-filter-bar';

/**
 * filters the tickets list based on the current filter state
 *
 * @param {Array} ticketEntities
 * @param {string} showTickets
 * @param {string} ticketsSortedBy
 * @return {Array} filtered list of tickets
 */
export const getFilteredTicketEntitiesList = ( ticketEntities, showTickets, ticketsSortedBy ) => {
	return showTickets && ticketsSortedBy && ! isEmpty( ticketEntities ) ?
		sortTicketEntitiesList(
			filterTicketEntities( ticketEntities, showTickets ),
			ticketsSortedBy
		) :
		[];
};
/**
 * withTicketEntitiesListFilterBar
 * Higher-Order-Component that wraps an "EntityList" component
 * with an EntityListFilterBar & TicketEntityListFilterBar component
 * that controls how entities are displayed
 *
 * @param {Object} EntityList
 * @return {Object} EntityList with added TicketsListFilterBar
 */
export default createHigherOrderComponent(
	( EntityList ) => {
		return class extends Component {
			render() {
				const {
					showTickets,
					setShowTickets,
					ticketsSortedBy,
					setTicketsSortedBy,
					displayTicketDate,
					setDisplayTicketDate,
					isChained,
					setIsChained,
					searchTicketName,
					setSearchTicketName,
					ticketsPerPage,
					setTicketsPerPage,
					ticketsView,
					setTicketsListView,
					setTicketsGridView,
					prefiltered = false,
					entities,
					...otherProps
				} = this.props;
				let filteredEntities = searchTicketEntities( entities, searchTicketName );
				filteredEntities = prefiltered ?
					filteredEntities :
					getFilteredTicketEntitiesList(
						filteredEntities,
						showTickets,
						ticketsSortedBy
					);
				return (
					<Fragment>
						<EntityListFilterBar
							name="TicketEntityListFilterBar"
							searchText={ searchTicketName }
							setSearchText={ setSearchTicketName }
							perPage={ ticketsPerPage }
							view={ ticketsView }
							setPerPage={ setTicketsPerPage }
							setListView={ setTicketsListView }
							setGridView={ setTicketsGridView }
							entityFilters={
								<TicketEntityListFilterBar
									showTickets={ showTickets }
									setShowTickets={ setShowTickets }
									ticketsSortedBy={ ticketsSortedBy }
									setTicketsSortedBy={ setTicketsSortedBy }
									displayTicketDate={ displayTicketDate }
									setDisplayTicketDate={ setDisplayTicketDate }
									isChained={ isChained }
									setIsChained={ setIsChained }
								/>
							}
						/>
						<EntityList
							entities={ filteredEntities }
							entitiesPerPage={ ticketsPerPage }
							view={ ticketsView }
							noResultsText={
								__(
									'no results found (try changing filters)',
									'event_espresso'
								)
							}
							displayTicketDate={ displayTicketDate }
							isChained={ isChained }
							{ ...otherProps }
						/>
					</Fragment>
				);
			}
		};
	},
	'withTicketEntitiesListFilterBar'
);

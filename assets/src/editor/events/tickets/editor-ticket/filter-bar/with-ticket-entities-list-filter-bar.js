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
 * @param {string} sortTickets
 * @return {Array} filtered list of tickets
 */
export const getFilteredTicketsList = ( ticketEntities, showTickets, sortTickets ) => {
	return showTickets && sortTickets && ! isEmpty( ticketEntities ) ?
		sortTicketEntitiesList(
			filterTicketEntities( ticketEntities, showTickets ),
			sortTickets
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
					sortTickets,
					setSortTickets,
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
					getFilteredTicketsList(
						filteredEntities,
						showTickets,
						sortTickets
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
									sortTickets={ sortTickets }
									setSortTickets={ setSortTickets }
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

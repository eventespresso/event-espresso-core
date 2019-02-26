/**
 * External imports
 */
import { Component, Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@eventespresso/i18n';
import { EntityListFilterBar } from '@eventespresso/higher-order-components';

/**
 * Internal dependencies
 */
import {
	filterTickets,
	searchTickets,
	sortTicketsList,
} from './tickets-list-filter-utils';
import { default as TicketListFilterBar } from './tickets-list-filter-bar';

/**
 * filters the tickets list based on the current filter state
 *
 * @param {Array} entities
 * @param {string} showTickets
 * @param {string} sortTickets
 * @return {Array} filtered list of tickets
 */
export const getFilteredTicketsList = ( entities, showTickets, sortTickets ) => {
	return showTickets && sortTickets && entities ?
		sortTicketsList(
			filterTickets( entities, showTickets ),
			sortTickets
		) :
		[];
};
/**
 * withTicketsListFilterBar
 * Higher-Order-Component that wraps an "EntityList" component
 * with an EntityListFilterBar & TicketListFilterBar component
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
					...otherProps
				} = this.props;
				let { entities } = this.props;
				entities = searchTickets( entities, searchTicketName );
				entities = prefiltered ?
					entities :
					getFilteredTicketsList(
						entities,
						showTickets,
						sortTickets
					);
				delete otherProps.entities;
				return (
					<Fragment>
						<EntityListFilterBar
							name="TicketListFilterBar"
							searchText={ searchTicketName }
							setSearchText={ setSearchTicketName }
							perPage={ ticketsPerPage }
							view={ ticketsView }
							setPerPage={ setTicketsPerPage }
							setListView={ setTicketsListView }
							setGridView={ setTicketsGridView }
							entityFilters={
								<TicketListFilterBar
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
							entities={ entities }
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
	'withTicketsListFilterBar'
);

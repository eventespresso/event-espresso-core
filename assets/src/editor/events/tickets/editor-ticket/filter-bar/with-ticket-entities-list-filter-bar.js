/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { Fragment, useMemo, useEffect } from '@wordpress/element';
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { __ } from '@eventespresso/i18n';
import { EntityListFilterBar } from '@eventespresso/higher-order-components';
import { withFilteredDateEntities } from '../../../dates-and-times';

/**
 * Internal dependencies
 */
import {
	filterTicketEntities,
	searchTicketEntities,
	sortTicketEntitiesList,
} from './ticket-entities-list-filter-utils';
import { default as TicketEntityListFilterBar } from './ticket-entities-list-filter-bar';
import withTicketEntitiesForFilteredDateEntities
	from './with-ticket-entities-for-filtered-date-entities';

const DEFAULT_EMPTY_ARRAY = [];

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
const withTicketEntitiesListFilterBar = createHigherOrderComponent(
	( EntityList ) => ( {
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
		setFilteredTicketEntities,
		defaultTicketsListView,
		defaultTicketsListPerPage,
		setDefaultTicketsListView,
		setDefaultTicketsListPerPage,
		ticketEntities = DEFAULT_EMPTY_ARRAY,
		filteredDateEntities = DEFAULT_EMPTY_ARRAY,
		...otherProps
	} ) => {
		const filteredEntities = useMemo(
			() => {
				const entities = searchTicketEntities( ticketEntities, searchTicketName );
				return getFilteredTicketEntitiesList(
					entities,
					showTickets,
					ticketsSortedBy
				);
			},
			[
				ticketEntities,
				searchTicketName,
				showTickets,
				ticketsSortedBy,
			]
		);
		// whenever filtered entities changes let's update the ticket ids
		// in the state.
		useEffect( () => {
			setFilteredTicketEntities(
				filteredEntities.map( ( ticketEntity ) => ticketEntity.id )
			);
		}, [ isChained, filteredDateEntities ] );

		return (
			<Fragment>
				<EntityListFilterBar
					name="TicketEntityListFilterBar"
					searchText={ searchTicketName }
					setSearchText={ setSearchTicketName }
					perPage={ ticketsPerPage }
					view={ ticketsView || defaultTicketsListView }
					setPerPage={ setTicketsPerPage }
					setListView={ setTicketsListView }
					setGridView={ setTicketsGridView }
					defaultView={ defaultTicketsListView }
					defaultPerPage={ defaultTicketsListPerPage }
					setDefaultView={ setDefaultTicketsListView }
					setDefaultPerPage={ setDefaultTicketsListPerPage }
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
	},
	'withTicketEntitiesListFilterBar'
);

export default compose( [
	withFilteredDateEntities,
	withTicketEntitiesForFilteredDateEntities,
	withTicketEntitiesListFilterBar,
] );

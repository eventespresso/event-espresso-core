/**
 * External imports
 */
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * withTicketEntitiesListFilterState
 * Higher-Order-Component that wraps a "TicketsListFilterBar" component
 * in order to provide state management for it and its children
 *
 * @param {Object} WrappedComponent
 * @return {Object} WrappedComponent with added DatesListFilterState
 */
export default createHigherOrderComponent(
	compose( [
		withSelect( ( select, ownProps ) => {
			const {
				showTickets = 'on-sale-and-pending',
				ticketsSortedBy = 'chronologically',
				displayTicketDate = 'start',
				isChained = true,
				searchTicketName = '',
				ticketsPerPage,
				ticketsView,
				defaultTicketsListView,
				defaultTicketsListPerPage,
			} = ownProps;
			const store = select( 'eventespresso/filter-state' );
			const { getEntitiesByIds } = select( 'eventespresso/core' );
			return {
				showTickets: store.getFilter(
					'event-editor-ticket-list',
					'showTickets',
					showTickets
				),
				ticketsSortedBy: store.getFilter(
					'event-editor-ticket-list',
					'ticketsSortedBy',
					ticketsSortedBy
				),
				displayTicketDate: store.getFilter(
					'event-editor-ticket-list',
					'displayTicketDate',
					displayTicketDate
				),
				isChained: store.getFilter(
					'event-editor-ticket-list',
					'isChained',
					isChained
				),
				searchTicketName: store.getFilter(
					'entity-list',
					'searchTicketName',
					searchTicketName
				),
				ticketsPerPage: parseInt(
					store.getFilter(
						'event-editor-ticket-list',
						'ticketsPerPage',
						ticketsPerPage || defaultTicketsListPerPage
					),
					10
				),
				ticketsView: store.getFilter(
					'event-editor-ticket-list',
					'ticketsView',
					ticketsView || defaultTicketsListView
				),
				filteredTicketEntities: getEntitiesByIds(
					'ticket',
					store.getFilter(
						'event-editor-ticket-list',
						'filteredTicketIds',
						DEFAULT_EMPTY_ARRAY
					)
				),
			};
		} ),
		withDispatch( ( dispatch ) => {
			const store = dispatch( 'eventespresso/filter-state' );
			return {
				setShowTickets: ( showTickets ) => store.setFilter(
					'event-editor-ticket-list',
					'showTickets',
					showTickets
				),
				setTicketsSortedBy: ( ticketsSortedBy ) => store.setFilter(
					'event-editor-ticket-list',
					'ticketsSortedBy',
					ticketsSortedBy
				),
				setDisplayTicketDate: ( displayTicketDate ) => store
					.setFilter(
						'event-editor-ticket-list',
						'displayTicketDate',
						displayTicketDate
					),
				setIsChained: ( isChained ) => store.setFilter(
					'event-editor-ticket-list',
					'isChained',
					!! isChained
				),
				setSearchTicketName: ( searchTicketName ) => store.setFilter(
					'entity-list',
					'searchTicketName',
					searchTicketName
				),
				setTicketsPerPage: ( ticketsPerPage ) => store.setFilter(
					'event-editor-ticket-list',
					'ticketsPerPage',
					parseInt( ticketsPerPage, 10 )
				),
				setTicketsListView: () => store.setFilter(
					'event-editor-ticket-list',
					'ticketsView',
					'list'
				),
				setTicketsGridView: () => store.setFilter(
					'event-editor-ticket-list',
					'ticketsView',
					'grid'
				),
				setFilteredTicketEntities: ( ticketEntityIds ) => store.setFilter(
					'event-editor-ticket-list',
					'filteredTicketIds',
					ticketEntityIds
				),
			};
		} ),
	] ),
	'withTicketEntitiesListFilterState'
);

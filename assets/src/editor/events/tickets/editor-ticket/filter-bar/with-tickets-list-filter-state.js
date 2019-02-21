/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

/**
 * withTicketsListFilterState
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
				sortTickets = 'chronologically',
				displayTicketDate = 'start',
				isChained = true,
				ticketsPerPage = 6,
				ticketsView = 'grid',
			} = ownProps;
			const store = select( 'eventespresso/filter-state' );
			return {
				showTickets: store.getFilter(
					'event-editor-ticket-list',
					'showTickets',
					showTickets
				),
				sortTickets: store.getFilter(
					'event-editor-ticket-list',
					'sortTickets',
					sortTickets
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
				ticketsPerPage: store.getFilter(
					'event-editor-ticket-list',
					'ticketsPerPage',
					ticketsPerPage
				),
				ticketsView: store.getFilter(
					'event-editor-ticket-list',
					'ticketsView',
					ticketsView
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
				setSortTickets: ( sortTickets ) => store.setFilter(
					'event-editor-ticket-list',
					'sortTickets',
					sortTickets
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
					isChained
				),
				setTicketsPerPage: ( ticketsPerPage ) => store.setFilter(
					'event-editor-ticket-list',
					'ticketsPerPage',
					ticketsPerPage
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
			};
		} ),
		( WrappedComponent ) => {
			return class extends Component {
				render() {
					return <WrappedComponent { ...this.props } />;
				}
			};
		},
	] ),
	'withTicketsListFilterState'
);

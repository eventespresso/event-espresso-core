/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component } from '@wordpress/element';
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data'

/**
 * Internal dependencies
 */
import { default as ticketsListFilterState } from './tickets-list-filter-state';
import { filterStateHandler } from '../../../../../higher-order-components/filter-bar';

/**
 * withTicketsListFilterState
 * Higher-Order-Component that wraps a "TicketsListFilterBar" component
 * in order to provide state management for it and its children
 *
 * @param {Object} paginationConfig
 * @return {Object} EntityList with added EntityPagination
 */
export default createHigherOrderComponent(
	( TicketsListFilterBar ) => {
		class TicketsListFilterState extends Component {
			static propTypes = {
				entities: PropTypes.arrayOf( PropTypes.object ).isRequired,
			};

			constructor( props ) {
				super( props );
				this.state = this.getFilterState( this.props.entities );
			}

			componentDidMount() {
				filterStateHandler.addListener( this.hasUpdates );
			}

			componentWillUnmount() {
				filterStateHandler.removeListener( this.hasUpdates );
			}

			/**
			 * @param {Object} newState
			 */
			hasUpdates = newState => {
				if ( this.state !== newState ) {
					this.setState( newState );
				}
			};

			/**
			 * @param {Array} entities
			 * @return {Object} filter state object
			 */
			getFilterState = entities => {
				// state with added actions for tickets list filters
				return filterStateHandler.register(
					ticketsListFilterState.handler,
					// merge initial filter bar state object with entities
					{
						...ticketsListFilterState.initialState,
						...{ entities: entities, tickets: entities },
					}
				);
			};

			render() {
				const { ...otherProps } = this.props;
				return <TicketsListFilterBar
					{ ...this.state }
					{ ...otherProps }
				/>;
			}
		}
		return compose( [
			withSelect( ( select, ownProps ) => {
				const {
					showTickets = 'on-sale-and-pending',
					sortTickets = 'chronologically',
					displayTicketDate = 'both',
					isChained = true,
				} = ownProps;
				const selectData = select( 'eventespresso/filter-state' );
				return {
					showTickets: selectData
						.getItemToShow( 'ticket', 'showTickets' ) ||
						showTickets,
					sortTickets: selectData
						.getSortBy( 'ticket' ) ||
						sortTickets,
					displayTicketDate: selectData
						.getItemToShowWithValue( 'ticket', 'displayTicketDate' ) ||
						displayTicketDate,
					isChained: selectData
						.getIsChained( 'ticket' ) ||
						isChained,
				};
			} ),
			withDispatch( ( dispatch ) => {
				const dispatchData = dispatch( 'eventespresso/filter-state' );
				return {
					setShowTickets: ( itemToShow ) => dispatchData
						.setItemToShow( 'ticket', itemToShow ),
					setSortTickets: ( sortBy ) => dispatchData
						.setSortBy( 'ticket', sortBy ),
					setDisplayTicketDate: ( ticketDateValue ) => dispatchData
						.setItemToShowWithValue(
							'ticket',
							'displayTicketDate',
							ticketDateValue
						),
					setIsChained: ( isChained ) => dispatchData
						.setIsChained( 'ticket', isChained ),
				};
			} ),
		] )( TicketsListFilterState );
	},
	'withTicketsListFilterState'
);

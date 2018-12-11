/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component } from 'react';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { default as ticketsListFilterState } from './tickets-list-filter-state';
import { filterStateHandler } from '../../../../higher-order-components/filter-bar';

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
		return TicketsListFilterState;
	},
	'withTicketsListFilterState'
);

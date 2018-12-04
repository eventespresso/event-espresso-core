/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component } from 'react';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { default as datesListFilterState } from './dates-list-filter-state';
import { filterStateHandler } from '../../../../higher-order-components/filter-bar';

/**
 * withDatesListFilterState
 * Higher-Order-Component that wraps a "DatesListFilterBar" component
 * in order to provide state management for it and its children
 *
 * @param {Object} paginationConfig
 * @return {Object} EntityList with added EntityPagination
 */
export default createHigherOrderComponent(
	( DatesListFilterBar ) => {
		class DatesListFilterState extends Component {
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
				// state with added actions for dates list filters
				return filterStateHandler.register(
					datesListFilterState.handler,
					// merge initial filter bar state object with entities
					{
						...datesListFilterState.initialState,
						...{ entities: entities },
					}
				);
			};

			render() {
				const { ...otherProps } = this.props;
				return <DatesListFilterBar
					{ ...this.state }
					{ ...otherProps }
				/>;
			}
		}
		return DatesListFilterState;
	},
	'withDatesListFilterState'
);

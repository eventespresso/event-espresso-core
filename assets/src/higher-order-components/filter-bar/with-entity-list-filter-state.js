/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component } from 'react';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { default as filterStateHandler } from './filter-state-handler';
import { default as viewFilterState } from './view-filter-state';

/**
 * withEntityListFilterState
 * Higher-Order-Component that wraps an "EntityListFilterBar" component
 * in order to provide state management for it and its children
 *
 * @param {Object} paginationConfig
 * @return {Object} EntityList with added EntityPagination
 */
export default createHigherOrderComponent(
	( EntityListFilterBar ) => {
		class EntityListFilterState extends Component {
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
				// merge initial state object for filter bar with entities
				const state = {
					...viewFilterState.initialState,
					...{ entities: entities },
				};
				// state with added actions for view filters
				return filterStateHandler.register(
					viewFilterState.handler,
					state
				);
			};

			render() {
				const { ...otherProps } = this.props;
				return <EntityListFilterBar
					{ ...this.state }
					{ ...otherProps }
				/>;
			}
		}

		return EntityListFilterState;
	},
	'withEntityListFilterState'
);

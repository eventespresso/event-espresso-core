/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component } from '@wordpress/element';
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

/**
 * withEntityListFilterState
 * Higher-Order-Component that wraps an "EntityListFilterBar" component
 * in order to provide state management for it and its children
 *
 * @param {Object} WrappedComponent
 * @return {Object} WrappedComponent with added EntityListFilterState
 */
export default createHigherOrderComponent(
	compose( [
		withSelect( ( select, ownProps ) => {
			const {
				searchText = '',
				perPage = 6,
				view = 'grid',
			} = ownProps;
			const store = select( 'eventespresso/filter-state' );
			return {
				searchText: store.getFilter(
					'entity-list',
					'searchText',
					searchText
				),
				perPage: parseInt(
					store.getFilter(
						'entity-list',
						'perPage',
						perPage
					)
				),
				view: store.getFilter(
					'entity-list',
					'view',
					view
				),
			};
		} ),
		withDispatch( ( dispatch ) => {
			const store = dispatch( 'eventespresso/filter-state' );
			return {
				setSearchText: ( searchText ) => store.setFilter(
					'entity-list',
					'searchText',
					searchText
				),
				setPerPage: ( perPage ) => store.setFilter(
					'entity-list',
					'perPage',
					parseInt( perPage )
				),
				setListView: () => store.setFilter(
					'entity-list',
					'view',
					'list'
				),
				setGridView: () => store.setFilter(
					'entity-list',
					'view',
					'grid'
				),
			};
		} ),
		( WrappedComponent ) => {
			return class extends Component {
				static propTypes = {
					entities: PropTypes.arrayOf( PropTypes.object ).isRequired,
				};
				render() {
					return <WrappedComponent { ...this.props } />;
				}
			};
		},
	] ),
	'withEntityListFilterState'
);

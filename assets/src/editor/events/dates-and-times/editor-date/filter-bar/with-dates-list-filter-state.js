/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

/**
 * withDatesListFilterState
 * Higher-Order-Component that wraps a "DatesListFilterBar" component
 * (or parent component that ultimately wraps a "DatesListFilterBar" component)
 * in order to provide state management for it and its children
 *
 * @param {Object} WrappedComponent
 * @return {Object} WrappedComponent with added DatesListFilterState
 */
export default createHigherOrderComponent(
	compose( [
		withSelect( ( select, ownProps ) => {
			const {
				showDates = 'active-upcoming',
				sortDates = 'chronologically',
				displayDates = 'start',
				datesPerPage = 6,
				datesView = 'grid',
			} = ownProps;
			const store = select( 'eventespresso/filter-state' );
			return {
				showDates: store.getFilter(
					'event-editor-dates-list',
					'showDates',
					showDates
				),
				sortDates: store.getFilter(
					'event-editor-dates-list',
					'sortDates',
					sortDates
				),
				displayDates: store.getFilter(
					'event-editor-dates-list',
					'displayDates',
					displayDates
				),
				datesPerPage: store.getFilter(
					'event-editor-dates-list',
					'datesPerPage',
					datesPerPage
				),
				datesView: store.getFilter(
					'event-editor-dates-list',
					'datesView',
					datesView
				),
			};
		} ),
		withDispatch( ( dispatch ) => {
			const store = dispatch( 'eventespresso/filter-state' );
			return {
				setShowDates: ( showDates ) => store.setFilter(
					'event-editor-dates-list',
					'showDates',
					showDates
				),
				setSortDates: ( sortDates ) => store.setFilter(
					'event-editor-dates-list',
					'sortDates',
					sortDates
				),
				setDisplayDates: ( displayDates ) => store.setFilter(
					'event-editor-dates-list',
					'displayDates',
					displayDates
				),
				setDatesPerPage: ( datesPerPage ) => store.setFilter(
					'event-editor-dates-list',
					'datesPerPage',
					datesPerPage
				),
				setDatesListView: () => store.setFilter(
					'event-editor-dates-list',
					'datesView',
					'list'
				),
				setDatesGridView: () => store.setFilter(
					'event-editor-dates-list',
					'datesView',
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
	'withDatesListFilterState'
);

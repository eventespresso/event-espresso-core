/**
 * External imports
 */
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

const DEFAULT_EMPTY_ARRAY = [];

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
				datesSortedBy = 'chronologically',
				displayDates = 'start',
				searchDateName = '',
				datesPerPage = 6,
				datesView = 'grid',
			} = ownProps;
			const store = select( 'eventespresso/filter-state' );
			const { getEntitiesByIds } = select( 'eventespresso/core' );
			return {
				showDates: store.getFilter(
					'event-editor-dates-list',
					'showDates',
					showDates
				),
				datesSortedBy: store.getFilter(
					'event-editor-dates-list',
					'datesSortedBy',
					datesSortedBy
				),
				displayDates: store.getFilter(
					'event-editor-dates-list',
					'displayDates',
					displayDates
				),
				searchDateName: store.getFilter(
					'entity-list',
					'searchDateName',
					searchDateName
				),
				datesPerPage: parseInt(
					store.getFilter(
						'event-editor-dates-list',
						'datesPerPage',
						datesPerPage
					),
					10
				),
				datesView: store.getFilter(
					'event-editor-dates-list',
					'datesView',
					datesView
				),
				filteredDateEntities: getEntitiesByIds(
					'datetime',
					store.getFilter(
						'event-editor-dates-list',
						'filteredDateIds',
						DEFAULT_EMPTY_ARRAY
					)
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
				setDatesSortedBy: ( datesSortedBy ) => store.setFilter(
					'event-editor-dates-list',
					'datesSortedBy',
					datesSortedBy
				),
				setDisplayDates: ( displayDates ) => store.setFilter(
					'event-editor-dates-list',
					'displayDates',
					displayDates
				),
				setSearchDateName: ( searchDateName ) => store.setFilter(
					'entity-list',
					'searchDateName',
					searchDateName
				),
				setDatesPerPage: ( datesPerPage ) => store.setFilter(
					'event-editor-dates-list',
					'datesPerPage',
					parseInt( datesPerPage, 10 )
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
				setFilteredDateEntities: ( dateEntityIds ) => store.setFilter(
					'event-editor-dates-list',
					'filteredDateIds',
					dateEntityIds
				),
			};
		} ),
	] ),
	'withDateEntitiesListFilterState'
);

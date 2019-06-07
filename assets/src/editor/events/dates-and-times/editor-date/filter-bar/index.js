/**
 * External imports
 */
import { withEntityPagination } from '@eventespresso/higher-order-components';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import withDateEntitiesListFilterBar from './with-date-entities-list-filter-bar';
import withDatesListFilterState from './with-dates-list-filter-state';

const withPaginatedDateEntitiesListWithFilterBar = (
	paginationConfig = {}
) => createHigherOrderComponent(
	compose( [
		withDateEntitiesListFilterBar,
		withEntityPagination( paginationConfig ),
	] ),
	'withPaginatedDateEntitiesListWithFilterBar'
);

const withPaginatedDateEntitiesListWithFilterBarAndState = (
	paginationConfig = {}
) => createHigherOrderComponent(
	compose( [
		withDatesListFilterState,
		withDateEntitiesListFilterBar,
		withEntityPagination( paginationConfig ),
	] ),
	'withPaginatedDateEntitiesListWithFilterBarAndState'
);

export { getFilteredDateEntitiesList } from './with-date-entities-list-filter-bar';
export {
	withDateEntitiesListFilterBar,
	withDatesListFilterState,
	withPaginatedDateEntitiesListWithFilterBarAndState,
	withPaginatedDateEntitiesListWithFilterBar,
};

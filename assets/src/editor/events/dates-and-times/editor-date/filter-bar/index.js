/**
 * External imports
 */
import { withEntityPagination } from '@eventespresso/higher-order-components';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import withDateEntitiesListFilterBar, {
	getFilteredDateEntitiesList,
} from './with-date-entities-list-filter-bar';
import withDatesListFilterState from './with-dates-list-filter-state';
import withFilteredDateEntitiesList from './with-filtered-date-entities-list';

const withPaginatedDateEntitiesListAndFilterBar = (
	paginationConfig = {}
) => createHigherOrderComponent(
	compose( [
		withDateEntitiesListFilterBar,
		withEntityPagination( paginationConfig ),
	] ),
	'withPaginatedDateEntitiesListAndFilterBar'
);

const withPaginatedDateEntitiesListAndFilterBarAndState = (
	paginationConfig = {}
) => createHigherOrderComponent(
	compose( [
		withDatesListFilterState,
		withDateEntitiesListFilterBar,
		withEntityPagination( paginationConfig ),
	] ),
	'withPaginatedDateEntitiesListAndFilterBarAndState'
);

export {
	withDateEntitiesListFilterBar,
	withDatesListFilterState,
	withFilteredDateEntitiesList,
	withPaginatedDateEntitiesListAndFilterBarAndState,
	withPaginatedDateEntitiesListAndFilterBar,
	getFilteredDateEntitiesList,
};

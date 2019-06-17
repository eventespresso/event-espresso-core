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
import withDateEntitiesListFilterState from './with-date-entities-list-filter-state';
import withFilteredDateEntities from './with-filtered-date-entities';

const withPaginatedDateEntitiesListAndFilterBar = (
	paginationConfig = {}
) => createHigherOrderComponent(
	compose( [
		withDateEntitiesListFilterState,
		withDateEntitiesListFilterBar,
		withEntityPagination( paginationConfig ),
	] ),
	'withPaginatedDateEntitiesListAndFilterBar'
);

export {
	withDateEntitiesListFilterBar,
	withDateEntitiesListFilterState,
	withFilteredDateEntities,
	withPaginatedDateEntitiesListAndFilterBar,
	getFilteredDateEntitiesList,
};

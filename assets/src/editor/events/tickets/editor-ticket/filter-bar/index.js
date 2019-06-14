/**
 * External imports
 */
import { withEntityPagination } from '@eventespresso/higher-order-components';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import withTicketEntitiesListFilterBar, {
	getFilteredTicketEntitiesList,
} from './with-ticket-entities-list-filter-bar';
import withTicketEntitiesListFilterState
	from './with-ticket-entities-list-filter-state';
import withFilteredTicketEntities from './with-filtered-ticket-entities';

const withPaginatedTicketEntitiesListAndFilterBar = (
	paginationConfig = {}
) => createHigherOrderComponent(
	compose( [
		withTicketEntitiesListFilterBar,
		withEntityPagination( paginationConfig ),
	] ),
	'withPaginatedTicketEntitiesListAndFilterBar'
);

const withPaginatedTicketEntitiesListAndFilterBarAndState = (
	paginationConfig = {}
) => createHigherOrderComponent(
	compose( [
		withTicketEntitiesListFilterState,
		withTicketEntitiesListFilterBar,
		withEntityPagination( paginationConfig ),
	] ),
	'withPaginatedTicketEntitiesListAndFilterBarAndState'
);

export {
	withTicketEntitiesListFilterBar,
	withTicketEntitiesListFilterState,
	withFilteredTicketEntities,
	withPaginatedTicketEntitiesListAndFilterBar,
	withPaginatedTicketEntitiesListAndFilterBarAndState,
	getFilteredTicketEntitiesList,
};

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

const withPaginatedTicketEntitiesListWithFilterBar = (
	paginationConfig = {}
) => createHigherOrderComponent(
	compose( [
		withTicketEntitiesListFilterBar,
		withEntityPagination( paginationConfig ),
	] ),
	'withPaginatedTicketEntitiesListWithFilterBar'
);

const withPaginatedTicketEntitiesListWithFilterBarAndState = (
	paginationConfig = {}
) => createHigherOrderComponent(
	compose( [
		withTicketEntitiesListFilterState,
		withTicketEntitiesListFilterBar,
		withEntityPagination( paginationConfig ),
	] ),
	'withPaginatedTicketEntitiesListWithFilterBarAndState'
);

export {
	withTicketEntitiesListFilterBar,
	withTicketEntitiesListFilterState,
	withPaginatedTicketEntitiesListWithFilterBar,
	withPaginatedTicketEntitiesListWithFilterBarAndState,
	getFilteredTicketEntitiesList,
};

/**
 * External imports
 */
import { withEntityPagination } from '@eventespresso/higher-order-components';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import {
	default as withTicketEntitiesListFilterBar,
} from './with-ticket-entities-list-filter-bar';
import {
	default as withTicketEntitiesListFilterState,
} from './with-ticket-entities-list-filter-state';

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
};

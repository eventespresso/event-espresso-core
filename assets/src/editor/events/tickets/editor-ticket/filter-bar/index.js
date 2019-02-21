/**
 * External imports
 */
import { withEntityPagination } from '@eventespresso/higher-order-components';

/**
 * Internal dependencies
 */
import {
	default as withTicketsListFilterBar,
} from './with-tickets-list-filter-bar';
import {
	default as withTicketsListFilterState,
} from './with-tickets-list-filter-state';

const PaginatedTicketsListWithFilterBar = (
	EditorTickets,
	paginationConfig = {},
) => withTicketsListFilterBar(
	withEntityPagination( paginationConfig )( EditorTickets )
);

export const PaginatedTicketsListWithFilterBarAndState = (
	EditorTickets,
	paginationConfig = {},
) => withTicketsListFilterState( withTicketsListFilterBar(
	withEntityPagination( paginationConfig )( EditorTickets )
) );

export default PaginatedTicketsListWithFilterBar;

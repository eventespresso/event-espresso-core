/**
 * External imports
 */
import {
	default as withEntityPagination,
} from '../../../../higher-order-components/pagination';

/**
 * Internal dependencies
 */
import {
	default as withDatesListFilterBar,
} from './with-dates-list-filter-bar';
import {
	default as withDatesListFilterState,
} from './with-dates-list-filter-state';

const PaginatedDatesListWithFilterBar = (
	EditorDates,
	paginationConfig = {},
) => withDatesListFilterBar(
	withEntityPagination( paginationConfig )( EditorDates )
);

export const PaginatedDatesListWithFilterBarAndState = (
	EditorDates,
	paginationConfig = {},
) => withDatesListFilterState( withDatesListFilterBar(
	withEntityPagination( paginationConfig )( EditorDates )
) );

export default PaginatedDatesListWithFilterBar;

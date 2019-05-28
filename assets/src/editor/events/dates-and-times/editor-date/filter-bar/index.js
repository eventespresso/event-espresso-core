/**
 * External imports
 */
import { withEntityPagination } from '@eventespresso/higher-order-components';

/**
 * Internal dependencies
 */
import withDatesListFilterBar from './with-dates-list-filter-bar';
import withDatesListFilterState from './with-dates-list-filter-state';

const PaginatedDatesListWithFilterBar = (
	EditorDates,
	paginationConfig = {},
) => withDatesListFilterBar(
	withEntityPagination( paginationConfig )( EditorDates )
);

const PaginatedDatesListWithFilterBarAndState = (
	EditorDates,
	paginationConfig = {},
) => withDatesListFilterState( withDatesListFilterBar(
	withEntityPagination( paginationConfig )( EditorDates )
) );

export { getFilteredDatesList } from './with-dates-list-filter-bar';
export {
	withDatesListFilterBar,
	withDatesListFilterState,
	PaginatedDatesListWithFilterBarAndState,
};
export default PaginatedDatesListWithFilterBar;

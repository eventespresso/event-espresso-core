/**
 * External imports
 */
import { default as withEntityPagination } from '../pagination';

/**
 * Internal dependencies
 */
import {
	default as withEntityListFilterBar,
} from './with-entity-list-filter-bar';
import {
	default as withEntityListFilterState,
} from './with-entity-list-filter-state';

export const PaginatedEntityListWithFilterBar = (
	EntityList,
	paginationConfig = {},
) => withEntityListFilterBar(
	withEntityPagination( paginationConfig )( EntityList )
);

export const PaginatedEntityListWithFilterBarAndState = (
	EntityList,
	paginationConfig = {},
) => withEntityListFilterState( withEntityListFilterBar(
	withEntityPagination( paginationConfig )( EntityList )
) );

export { default as EntityListFilterBar } from './entity-list-filter-bar';

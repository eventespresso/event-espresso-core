/**
 * External imports
 */
import { withEntityPagination } from '@eventespresso/higher-order-components';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

/**
 * Internal imports
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
		( WrappedComponent ) => ( props ) => {
			const { setFilter } = useDispatch(
				'eventespresso/filter-state'
			);
			const onPageChange = useCallback(
				( updatedPagedDateEntities ) => {
					setFilter(
						'event-editor-dates-list',
						'filteredPagedDateIds',
						updatedPagedDateEntities.map( ( entity ) => entity.id )
					);
				},
				[ setFilter ]
			);
			return <WrappedComponent
				onPageChange={ onPageChange }
				{ ...props }
			/>;
		},
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

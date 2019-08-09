/**
 * External imports
 */
import {
	EntityList,
	EntityPagination,
	useEntityListFilterState,
	usePaginatedEntities,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { __, _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import EditorDateEntitiesGridView from './grid-view/editor-date-entities-grid-view';
import EditorDateEntitiesListView from './list-view/editor-date-entities-list-view';
import DateListFilterBar from './filter-bar/date-list-filter-bar';
import useDatesListFilterState from './filter-bar/use-dates-list-filter-state';
import useFilteredDatesList from './filter-bar/use-filtered-dates-list';
import AddNewDateEntityButton from './add-new-date-entity-button';
import TicketAssignmentsButton from './ticket-assignments-button';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const EditorDateEntitiesList = ( {
	dateEntities = [],
	...otherProps
} ) => {
	const listId = 'event-editor-dates-list';
	const datesListFilters = useDatesListFilterState( { listId } );
	const {
		view,
		perPage,
		...entityListFilters
	} = useEntityListFilterState( { listId } );
	const entities = useFilteredDatesList( {
		dateEntities,
		...entityListFilters,
		...datesListFilters,
	} );
	const {
		allEntities,
		paginatedEntities,
		onPaginationChange,
	} = usePaginatedEntities( entities, perPage );
	return (
		<FormWrapper>
			<DateListFilterBar
				listId={ listId }
				view={ view }
				perPage={ perPage }
				{ ...datesListFilters }
				{ ...entityListFilters }
			/>
			<EntityPagination
				allEntities={ allEntities }
				entitiesPerPage={ perPage }
				onPaginationChange={ onPaginationChange }
			/>
			<EntityList
				{ ...otherProps }
				entities={ paginatedEntities }
				EntityGridView={ EditorDateEntitiesGridView }
				EntityListView={ EditorDateEntitiesListView }
				view={ view }
				loadingNotice={ sprintf(
					_x(
						'loading event dates%s',
						'loading event dates...',
						'event_espresso'
					),
					String.fromCharCode( 8230 )
				) }
				noResultsText={ __(
					'no results found (try changing filters)',
					'event_espresso'
				) }
			/>
			<FormSaveCancelButtons
				submitButton={ <AddNewDateEntityButton /> }
				cancelButton={ <TicketAssignmentsButton /> }
			/>
		</FormWrapper>
	);
};

export default EditorDateEntitiesList;

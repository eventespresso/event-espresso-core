/**
 * External imports
 */
import { useEffect } from '@wordpress/element';
import {
	EntityList,
	EntityPagination,
	twoColumnAdminFormLayout,
	useEntityListFilterState,
	useEntityPagination,
} from '@eventespresso/components';
import { __, _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import AddNewDateEntityButton from './add-new-date-entity-button';
import {
	DatesListFilterBar,
	useDatesListFilterState,
	useDatesListFilterStateSetters,
	useFilteredDatesList,
} from './filter-bar';
import { EditorDateEntitiesGridView } from './grid-view';
import { EditorDateEntitiesListView } from './list-view';
import { useEventEditorEventDates } from '@eventespresso/hooks';
import EditAllTicketAssignmentsButton
	from '../../ticket-assignments-manager/edit-all-ticket-assignments-button';

const {
	FormWrapper,
	FormButtonsRow,
} = twoColumnAdminFormLayout;

/**
 * EditorDateEntitiesList
 *
 * displays a paginated list of event dates with a filter bar
 * for controlling how and what event dates are displayed
 *
 * @param {boolean} eventDatesLoaded
 * @param {Object} otherProps
 * @return {Object} rendered event dates list
 */
const EditorDateEntitiesList = ( {
	eventDatesLoaded,
	...otherProps
} ) => {
	const listId = 'event-editor-dates-list';
	const { eventDates } = useEventEditorEventDates();
	const {
		showDates,
		datesSortedBy,
		displayDates,
		filteredDateIds,
	} = useDatesListFilterState( { listId } );
	const {
		view,
		perPage,
		...entityListFilters
	} = useEntityListFilterState( { listId } );
	const filteredDates = useFilteredDatesList( {
		listId,
		showDates,
		datesSortedBy,
		displayDates,
		dateEntities: eventDates,
		...entityListFilters,
	} );
	const {
		currentPage,
		setCurrentPage,
		paginatedEntities,
	} = useEntityPagination( perPage, filteredDates );
	// update the date ids in state whenever the filters change
	const {
		setFilteredDates,
		setDatesSortedBy,
	} = useDatesListFilterStateSetters( listId );
	useEffect( () => {
		if ( Array.isArray( paginatedEntities ) ) {
			const eventDateIds = paginatedEntities.map(
				( dateEntity ) => dateEntity.id
			);
			setFilteredDates( eventDateIds );
		}
	}, [ currentPage, perPage, showDates, datesSortedBy, eventDates.length ] );
	const entityOrder = filteredDateIds.join( '-' );
	return (
		<FormWrapper>
			<DatesListFilterBar
				listId={ listId }
				view={ view }
				perPage={ perPage }
				showDates={ showDates }
				datesSortedBy={ datesSortedBy }
				displayDates={ displayDates }
				{ ...entityListFilters }
			/>
			<EntityPagination
				key={ `dates-pagination-${ entityOrder }` }
				listId={ listId }
				currentPage={ currentPage }
				entitiesPerPage={ perPage }
				totalCount={ filteredDates.length }
				setCurrentPage={ setCurrentPage }
			/>
			<EntityList
				{ ...otherProps }
				key={ `dates-list-${ entityOrder }` }
				entities={ paginatedEntities }
				allEventDates={ eventDates }
				EntityGridView={ EditorDateEntitiesGridView }
				EntityListView={ EditorDateEntitiesListView }
				view={ view }
				showDate={ displayDates }
				setEntityIds={ setFilteredDates }
				setSortBy={ setDatesSortedBy }
				loading={ ! eventDatesLoaded }
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
			<FormButtonsRow>
				<AddNewDateEntityButton />
				<EditAllTicketAssignmentsButton
					eventDates={ paginatedEntities }
				/>
			</FormButtonsRow>
		</FormWrapper>
	);
};

export default EditorDateEntitiesList;

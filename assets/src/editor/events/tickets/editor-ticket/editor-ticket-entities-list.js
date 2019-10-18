/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import {
	EntityList,
	EntityPagination,
	useEntityListFilterState,
	useEntityPagination,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { __, _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import AddNewTicketButton from './add-new-ticket-button';
import useTicketsForEventEditorTicketList
	from './use-tickets-for-event-editor-ticket-list';
import { EditorTicketEntitiesGridView } from './grid-view/';
import { EditorTicketEntitiesListView } from './list-view/';
import {
	TicketsListFilterBar,
	useTicketsListFilterState,
	useTicketsListFilterStateSetters,
	useFilteredTicketsList,
} from './filter-bar';

const {
	FormWrapper,
	FormButtonsRow,
} = twoColumnAdminFormLayout;

/**
 * EditorTicketEntitiesList
 *
 * displays a paginated list of tickets with a filter bar
 * for controlling how and what tickets are displayed
 *
 * @param {Object} otherProps
 * @return {Object} rendered event dates list
 */
const EditorTicketEntitiesList = ( { ...otherProps } ) => {
	const listId = 'event-editor-ticket-list';
	const {
		isChained,
		showTickets,
		ticketsSortedBy,
		displayTicketDate,
		filteredTicketIds,
	} = useTicketsListFilterState( { listId } );
	const {
		tickets,
		ticketsLoaded,
	} = useTicketsForEventEditorTicketList( isChained );
	const {
		view,
		perPage,
		...entityListFilters
	} = useEntityListFilterState( { listId } );
	const filteredTickets = useFilteredTicketsList( {
		ticketEntities: tickets,
		isChained,
		showTickets,
		ticketsSortedBy,
		displayTicketDate,
		filteredTicketIds,
		...entityListFilters,
	} );
	const {
		currentPage,
		setCurrentPage,
		paginatedEntities,
	} = useEntityPagination( perPage, filteredTickets );
	// update the ticket ids in state whenever the filters change
	const {
		setFilteredTickets,
		setTicketsSortedBy,
	} = useTicketsListFilterStateSetters( listId );
	useEffect( () => {
		if ( Array.isArray( paginatedEntities ) ) {
			setFilteredTickets(
				paginatedEntities.map( ( ticket ) => ticket.id )
			);
		}
	}, [
		currentPage,
		perPage,
		isChained,
		showTickets,
		ticketsSortedBy,
		Array.isArray( tickets ) ? tickets.length : 0,
	] );
	const entityOrder = filteredTicketIds.join( '-' );
	return (
		<FormWrapper>
			<TicketsListFilterBar
				listId={ listId }
				view={ view }
				perPage={ perPage }
				isChained={ isChained }
				showTickets={ showTickets }
				ticketsSortedBy={ ticketsSortedBy }
				displayTicketDate={ displayTicketDate }
				filteredTicketIds={ filteredTicketIds }
				{ ...entityListFilters }
			/>
			<EntityPagination
				key={ `tickets-pagination-${ entityOrder }` }
				listId={ listId }
				currentPage={ currentPage }
				entitiesPerPage={ perPage }
				setCurrentPage={ setCurrentPage }
				totalCount={ filteredTickets.length }
			/>
			<EntityList
				{ ...otherProps }
				key={ `tickets-list-${ entityOrder }` }
				entities={ paginatedEntities }
				allTickets={ tickets }
				EntityGridView={ EditorTicketEntitiesGridView }
				EntityListView={ EditorTicketEntitiesListView }
				view={ view }
				displayTicketDate={ displayTicketDate }
				setEntityIds={ setFilteredTickets }
				setSortBy={ setTicketsSortedBy }
				loading={ ! ticketsLoaded }
				loadingNotice={ sprintf(
					_x(
						'loading available tickets%s',
						'loading available tickets...',
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
				<AddNewTicketButton />
			</FormButtonsRow>
		</FormWrapper>
	);
};

export default EditorTicketEntitiesList;

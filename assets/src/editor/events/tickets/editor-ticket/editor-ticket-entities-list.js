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
import { EditorTicketEntitiesGridView } from './grid-view/';
import { EditorTicketEntitiesListView } from './list-view/';
import {
	TicketsListFilterBar,
	useTicketsListFilterState,
	useTicketsListFilterStateSetters,
	useFilteredTicketsList,
} from './filter-bar';
import useTicketsForEventEditorTicketList
	from '../../hooks/use-tickets-for-event-editor-ticket-list';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const EditorTicketEntitiesList = ( { ...otherProps } ) => {
	const listId = 'event-editor-ticket-list';
	const {
		isChained,
		showTickets,
		ticketsSortedBy,
		displayTicketDate,
		...ticketListFilters
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
		...entityListFilters,
		...ticketListFilters,
	} );
	const {
		currentPage,
		setCurrentPage,
		paginatedEntities,
	} = useEntityPagination( perPage, filteredTickets );
	// update the ticket ids in state whenever the filters change
	const { setFilteredTickets } = useTicketsListFilterStateSetters( listId );
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
		tickets.length,
	] );
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
				{ ...ticketListFilters }
				{ ...entityListFilters }
			/>
			<EntityPagination
				listId={ listId }
				currentPage={ currentPage }
				entitiesPerPage={ perPage }
				setCurrentPage={ setCurrentPage }
				totalCount={ filteredTickets.length }
			/>
			<EntityList
				{ ...otherProps }
				entities={ paginatedEntities }
				EntityGridView={ EditorTicketEntitiesGridView }
				EntityListView={ EditorTicketEntitiesListView }
				view={ view }
				displayTicketDate={ displayTicketDate }
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
			<FormSaveCancelButtons submitButton={ <AddNewTicketButton /> } />
		</FormWrapper>
	);
};

export default EditorTicketEntitiesList;

/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useCallback } from '@wordpress/element';
import {
	EntityPagination,
	twoColumnAdminFormLayout,
	useEntityPagination,
} from '@eventespresso/components';
import { useCloseEditor } from '@eventespresso/editor-hocs';

/**
 * Internal imports
 */
import './ticket-assignments-manager.css';
import CancelTicketAssignmentsButton from './cancel-ticket-assignments-button';
import SubmitTicketAssignmentsButton from './submit-ticket-assignments-button';
import TicketAssignmentsTable from './table/ticket-assignments-table';
import {
	TicketAssignmentsFilters,
	useTicketAssignmentsFilters,
} from './filters';
import TicketAssignmentsFormErrorInfo
	from './ticket-assignments-form-error-info';
import {
	useAssignmentsCalculator,
	useAssignmentsErrorMessage,
	useTicketAssignments,
} from './hooks';

const {
	FormSection,
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const nullFunc = () => null;
const { alert } = window;

/**
 * Editor for assigning tickets to event dates
 *
 * @param {string} editorId
 * @param {BaseEntity} dateEntity
 * @param {BaseEntity} ticketEntity
 * @param {BaseEntity[]} allDateEntities
 * @param {BaseEntity[]} allTicketEntities
 * @param {Function} onUpdate
 * @return {Object} rendered Ticket Assignments Manager
 */
const TicketAssignmentsManager = ( {
	editorId,
	dateEntity,
	ticketEntity,
	allDateEntities,
	allTicketEntities,
	onUpdate = nullFunc,
} ) => {
	const perPage = 6;
	const closeEditor = useCloseEditor( editorId );

	const {
		entities,
		dateEntities,
		ticketEntities,
		currentAssignmentCounts,
		ticketDateMap,
	} = useTicketAssignments( {
		dateEntity,
		ticketEntity,
		allDateEntities,
		allTicketEntities,
	} );

	const {
		filteredDateEntities,
		filteredTicketEntities,
		...ticketAssignmentsFilters
	} = useTicketAssignmentsFilters( {
		dateEntity,
		dateEntities,
		ticketEntity,
		ticketEntities,
	} );

	const {
		currentPage,
		setCurrentPage,
		paginatedEntities,
	} = useEntityPagination( perPage, filteredDateEntities );

	const dateCount = Array.isArray( filteredDateEntities ) ?
		filteredDateEntities.length :
		0;
	const ticketCount = Array.isArray( filteredTicketEntities ) ?
		filteredTicketEntities.length :
		0;

	const {
		assignedState,
		hasNoAssignments,
		missingAssignmentCounts,
		assignmentCounts,
		setAssignedState,
	} = useAssignmentsCalculator( {
		dateEntities,
		ticketEntities,
		currentAssignmentCounts,
	} );

	const noAssignmentsMessage = useAssignmentsErrorMessage( {
		dateCount,
		ticketCount,
		missingAssignmentCounts,
	} );

	const beforeEditorClose = useCallback( ( update = false ) => {
		if ( hasNoAssignments ) {
			alert( noAssignmentsMessage );
			return false;
		}
		if ( update ) {
			onUpdate();
		}
		return true;
	}, [ hasNoAssignments, noAssignmentsMessage, onUpdate ] );

	return (
		<FormWrapper>
			<FormSection htmlClass={ 'ee-ticket-assignments-manager-form' }>
				<TicketAssignmentsFilters { ...ticketAssignmentsFilters } />
				<TicketAssignmentsFormErrorInfo
					errorMessage={ noAssignmentsMessage }
				/>
				<TicketAssignmentsTable
					dateCount={ dateCount }
					ticketCount={ ticketCount }
					dateEntities={ paginatedEntities }
					ticketEntities={ filteredTicketEntities }
					assignedState={ assignedState }
					assignmentCounts={ assignmentCounts }
					hasNoAssignments={ hasNoAssignments }
					ticketDateMap={ ticketDateMap }
					setAssignedState={ setAssignedState }
				/>
				<EntityPagination
					listId={ editorId }
					currentPage={ currentPage }
					entitiesPerPage={ perPage }
					totalCount={ entities.length }
					setCurrentPage={ setCurrentPage }
				/>
			</FormSection>
			<FormSaveCancelButtons
				submitButton={
					<SubmitTicketAssignmentsButton
						assignedState={ assignedState }
						hasNoAssignments={ hasNoAssignments }
						beforeEditorClose={ beforeEditorClose }
						closeEditor={ closeEditor }
						disabled={
							dateCount < 1 ||
							ticketCount < 1 ||
							noAssignmentsMessage !== ''
						}
					/>
				}
				cancelButton={
					<CancelTicketAssignmentsButton
						beforeEditorClose={ beforeEditorClose }
						closeEditor={ closeEditor }
					/>
				}
			/>
		</FormWrapper>
	);
};

TicketAssignmentsManager.propTypes = {
	dateEntity: PropTypes.object,
	allDateEntities: PropTypes.arrayOf( PropTypes.object ),
	ticketEntity: PropTypes.object,
	allTicketEntities: PropTypes.arrayOf( PropTypes.object ),
	onUpdate: PropTypes.func,
};

export default TicketAssignmentsManager;

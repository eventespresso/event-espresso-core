/**
 * External imports
 */
import { filter } from 'lodash';
import PropTypes from 'prop-types';
import warning from 'warning';
import { useCallback } from '@wordpress/element';

/**
 * Internal imports
 */
import useCreateRelationsForEventDateIdToTicketIds
	from '../../hooks/use-create-relations-for-event-date-id-to-ticket-ids';
import useRemoveRelationsForEventDateIdToTicketIds
	from '../../hooks/use-remove-relations-for-event-date-id-to-ticket-ids';

const nullFunc = () => {};

/**
 * @param {Function} setSubmitting
 * @param {Object} assignedState - { assigned, removed }
 * @param {boolean} hasNoAssignments
 * @param {Function} closeEditor
 * @param {Function} beforeEditorClose
 * @return {Function}   callback for persisting relation changes
 *                      between tickets and dates
 */
const useProcessTicketAssignments = ( {
	setSubmitting,
	assignedState,
	hasNoAssignments,
	closeEditor,
	beforeEditorClose = nullFunc,
} ) => {
	const addTicketEntities = useCreateRelationsForEventDateIdToTicketIds();
	const removeTicketEntities = useRemoveRelationsForEventDateIdToTicketIds();
	return useCallback( ( click ) => {
		if ( hasNoAssignments ) {
			// brings up confirm modal so the editor won't close
			return beforeEditorClose();
		}
		setSubmitting( true );
		// remove unwanted ticket relations from dates
		const relationUpdates = [];
		for ( const dateId in assignedState.removed ) {
			const ticketIdsToRemove = assignedState.removed[ dateId ];
			if ( Array.isArray( ticketIdsToRemove ) ) {
				relationUpdates.push(
					removeTicketEntities( dateId, ticketIdsToRemove )
				);
			}
		}
		// assign new ticket relations to dates
		for ( const dateId in assignedState.assigned ) {
			const ticketIdsToAssign = assignedState.assigned[ dateId ];
			if ( Array.isArray( ticketIdsToAssign ) ) {
				relationUpdates.push(
					addTicketEntities( dateId, ticketIdsToAssign )
				);
			}
		}
		// wait for relations to finish updating
		Promise.all( relationUpdates )
			.then( ( updates ) => {
				const wasUpdated = filter(
					updates,
					( updated ) => !! updated
				);
				beforeEditorClose( wasUpdated.length > 0 );
				setSubmitting( false );
				return closeEditor( click );
			} ).catch( ( error ) => {
				warning( false, error );
			} );
	}, [
		assignedState,
		hasNoAssignments,
		beforeEditorClose,
		closeEditor,
	] );
};

useProcessTicketAssignments.propTypes = {
	setSubmitting: PropTypes.func.isRequired,
	assignedState: PropTypes.shape( {
		assigned: PropTypes.object.isRequired,
		removed: PropTypes.object.isRequired,
	} ).isRequired,
	hasNoAssignments: PropTypes.bool.isRequired,
	beforeEditorClose: PropTypes.func,
};

export default useProcessTicketAssignments;

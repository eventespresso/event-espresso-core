/**
 * External imports
 */
import { useMemo, useCallback } from '@wordpress/element';
import { reduce, cloneDeep } from 'lodash';
import { __ } from '@eventespresso/i18n';

// @todo, when the wp.data.useSelect hook is available, we can utilize that in
// this custom hook and then we'll be able to remove the withSelect hoc usage
// in the composed `TicketAssignmentsManagerModal` component.

/**
 * Temporary description for hook to be fleshed out.
 *
 * Note the following assumptions about this hook:
 * - incoming assignedCounts has all ticketIds and dateIds accounted for in the
 * collection.  That means assignedState should never have a dateId or a ticketId
 * that doesn't exist in the assignedCounts collection.
 *
 *
 *
 * @param {BaseEntity[]} dateEntities an array of BaseEntity instances for the
 * datetime model.
 * @param {BaseEntity[]} ticketEntities an array of BaseEntity instances for the
 * ticket model.
 * @param {Object} assignedCounts  An object with two keys ( dates, tickets )
 * that contain maps of ids to counts of how many assignments that id has.
 * @param {Object} assignedState  An object with two keys ( assigned, removed)
 * that contain maps of date ids to array of ticket ids being changed in the
 * session.
 * @return {[]} A tuple like construction of three values:
 * - hasMissingAssignments {bool} Whether or not any tickets or dates in the
 * session have missing assignments
 * - noAssignmentsMessage {string} A helpful context aware error message to
 * show to the user when there is an entity with no assignments
 * - updatedAssignmentCounts {Object} The same as assignedCounts except modified
 * to account for changes in assignedState.
 * -
 */
const useAssignmentsCalculator = (
	dateEntities,
	ticketEntities,
	assignedCounts,
	assignedState,
) => {
	const getMessage = useCallback( ( missingAssignmentCounts ) => {
		let message;
		const ticketsMissing = missingAssignmentCounts.dates === 0 &&
			missingAssignmentCounts.tickets > 0;
		const datesMissing = missingAssignmentCounts.dates > 0 &&
			missingAssignmentCounts.tickets === 0;
		const bothMissing = missingAssignmentCounts.dates > 0 ||
			missingAssignmentCounts.tickets > 0;

		switch ( true ) {
			case ( dateEntities.length === 1 && datesMissing ) ||
			( ticketEntities.length === 1 && datesMissing ) :
				message = __(
					'Event Dates must always have at least one Ticket assigned to them. If the current assignment is not correct, assign the correct Ticket first, then remove others as required.',
					'event_espresso'
				);
				break;
			case ( ticketEntities.length === 1 && bothMissing ) ||
			( dateEntities.length === 1 && ticketsMissing ) :
				message = __(
					'Tickets must always have at least one Event Date assigned to them. If the current assignment is not correct, assign the correct Event Date first, then remove others as required.',
					'event_espresso'
				);
				break;
			case ( ticketsMissing ):
				message = __(
					'Tickets must always have at least one date assigned to them but one or more of the tickets below does not have any. Please correct the assignments for the highlighted cells.',
					'event_espresso'
				);
				break;
			default:
				message = __(
					'Event Dates must always have at least one Ticket assigned to them but one or more of the Event Dates below does not have any. Please correct the assignments for the highlighted cells.',
					'event_espresso'
				);
		}
		return message;
	}, [ dateEntities, ticketEntities ] );

	const [
		hasMissingAssignments,
		noAssignmentsMessage,
		updatedAssignmentsCounts,
	] = useMemo( () => {
		let totalMissingAssignments = 0;
		const missingAssignmentCounts = { dates: 0, tickets: 0 };
		const updatedCounts = cloneDeep( assignedCounts );

		// callback for counting assignments being added or removed
		const countAssignmentChangesForDates = ( emptyCount, count, dateId ) => {
			// first consider any assignedState.
			const assignedStateForDate = assignedState.assigned[ dateId ];

			if ( assignedStateForDate && Array.isArray( assignedStateForDate ) ) {
				assignedStateForDate.forEach( ( ticketId ) => {
					updatedCounts.dates[ dateId ]++;
					updatedCounts.tickets[ ticketId ]++;
				} );
			}

			// consider any removedState
			const removedStateForDate = assignedState.removed[ dateId ];

			if ( removedStateForDate && Array.isArray( removedStateForDate ) ) {
				removedStateForDate.forEach( ( ticketId ) => {
					updatedCounts.dates[ dateId ]--;
					updatedCounts.tickets[ ticketId ]--;
				} );
			}

			if ( updatedCounts.dates[ dateId ] === 0 ) {
				missingAssignmentCounts.dates++;
				emptyCount++;
			}

			return emptyCount;
		};

		const countAssignmentChangesForTickets = ( emptyCount, count ) => {
			if ( count === 0 ) {
				missingAssignmentCounts.tickets++;
				emptyCount++;
			}
			return emptyCount;
		};
		totalMissingAssignments = reduce(
			updatedCounts.dates,
			countAssignmentChangesForDates,
			totalMissingAssignments
		);
		totalMissingAssignments = reduce(
			updatedCounts.tickets,
			countAssignmentChangesForTickets,
			totalMissingAssignments
		);

		if ( totalMissingAssignments > 0 ) {
			return [ true, getMessage( missingAssignmentCounts ), updatedCounts ];
		}

		return [ false, '', updatedCounts ];
	}, [ assignedCounts, assignedState ] );
	return [
		hasMissingAssignments,
		noAssignmentsMessage,
		updatedAssignmentsCounts,
	];
};

export default useAssignmentsCalculator;

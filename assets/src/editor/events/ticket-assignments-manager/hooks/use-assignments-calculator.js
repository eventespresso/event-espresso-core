/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useMemo, useState } from '@wordpress/element';
import { reduce, cloneDeep } from 'lodash';

const INITIAL_STATE = { assigned: {}, removed: {} };

/**
 * Temporary description for hook to be fleshed out.
 *
 * Note the following assumptions about this hook:
 * - incoming assignmentCounts has all ticketIds and dateIds accounted for in
 * the collection.  That means assignedState should never have a dateId or a
 * ticketId that doesn't exist in the assignmentCounts collection.
 *
 *
 *
 * @param {Object} currentAssignmentCounts  An object with two keys
 *                                          ( dates, tickets ) that contain
 *                                          maps of ids to counts of how
 *                                          many assignments that id has.
 * @return {Object}
 *      - hasNoAssignments {bool} Whether or not any tickets or dates
 *      in the session have missing assignments
 *      - missingAssignmentCounts {Object} An object with counts of how many
 *      assignments are missing for dates and tickets
 *      - updatedAssignmentCounts {Object} The same as assignmentCounts except
 *      modified to account for changes in assignedState.
 *      - setAssignedState {Function} callback for updating assignments
 * -
 */
const useAssignmentsCalculator = ( currentAssignmentCounts ) => {
	const [ assignedState, setAssignedState ] = useState( INITIAL_STATE );
	return useMemo( () => {
		let totalMissingAssignments = 0;
		const missingAssignmentCounts = { dates: 0, tickets: 0 };
		const updatedCounts = cloneDeep( currentAssignmentCounts );
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

		return {
			assignedState,
			hasNoAssignments: totalMissingAssignments > 0,
			missingAssignmentCounts,
			assignmentCounts: updatedCounts,
			setAssignedState,
		};
	}, [ assignedState, currentAssignmentCounts ] );
};

useAssignmentsCalculator.propTypes = {
	currentAssignmentCounts: PropTypes.shape( {
		dates: PropTypes.number.isRequired,
		tickets: PropTypes.number.isRequired,
	} ).isRequired,
};

export default useAssignmentsCalculator;


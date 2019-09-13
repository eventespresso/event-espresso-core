/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * @param {number} dateCount                number of event dates
 * @param {number} ticketCount              number of tickets
 * @param {Object} missingAssignmentCounts  An object with two keys:
 *                                          ( dates, tickets )
 *                                          with counts of how many
 *                                          assignments are missing
 * @return {string} A helpful context aware error message
 *      to show to the user when there is an entity with no assignments
 */
const useAssignmentsErrorMessage = ( {
	dateCount,
	ticketCount,
	missingAssignmentCounts,
} ) => {
	return useMemo( () => {
		const datesMissing = missingAssignmentCounts.dates > 0;
		const ticketsMissing = missingAssignmentCounts.tickets > 0;

		if (
			datesMissing && ! ticketsMissing &&
			( dateCount === 1 || ticketCount === 1 )
		) {
			return __(
				'Event Dates must always have at least one Ticket' +
				' assigned to them. If the current assignment is not' +
				' correct, assign the correct Ticket first, then remove' +
				' others as required.',
				'event_espresso'
			);
		}

		if (
			( datesMissing && ticketsMissing && ticketCount === 1 ) ||
			( ticketsMissing && dateCount === 1 )
		) {
			return __(
				'Tickets must always have at least one Event Date' +
				' assigned to them. If the current assignment is not' +
				' correct, assign the correct Event Date first, then' +
				' remove others as required.',
				'event_espresso'
			);
		}

		if ( ticketsMissing ) {
			return __(
				'Tickets must always have at least one date assigned to' +
				' them but one or more of the tickets below does not' +
				' have any. Please correct the assignments for the' +
				' highlighted cells.',
				'event_espresso'
			);
		}

		if ( datesMissing ) {
			return __(
				'Event Dates must always have at least one Ticket' +
				' assigned to them but one or more of the Event Dates' +
				' below does not have any. Please correct the' +
				' assignments for the highlighted cells.',
				'event_espresso'
			);
		}

		return '';
	}, [ dateCount, ticketCount, missingAssignmentCounts ] );
};

useAssignmentsErrorMessage.propTypes = {
	dateCount: PropTypes.number.isRequired,
	ticketCount: PropTypes.number.isRequired,
	missingAssignmentCounts: PropTypes.shape( {
		assigned: PropTypes.number.isRequired,
		removed: PropTypes.number.isRequired,
	} ).isRequired,
};

export default useAssignmentsErrorMessage;


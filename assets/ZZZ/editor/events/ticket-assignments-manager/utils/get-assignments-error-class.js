/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * extra css class applied to ticket cell if assignment error exists
 *
 * @function
 * @param {number|string} dateId
 * @param {number|string} ticketId
 * @param {boolean} hasNoAssignments
 * @param {Object} assignmentCounts { dates, tickets }
 * @return {string} css class
 */
const getAssignmentsErrorClass = ( {
	dateId,
	ticketId,
	hasNoAssignments,
	assignmentCounts,
} ) => {
	const entitiesHaveEmptyAssignments = () => {
		return assignmentCounts.dates[ dateId ] === 0 ||
			assignmentCounts.tickets[ ticketId ] === 0;
	};
	return hasNoAssignments && entitiesHaveEmptyAssignments() ?
		' ee-tam-assignments-error' :
		'';
};

getAssignmentsErrorClass.propTypes = {
	dateId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
	ticketId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
	hasNoAssignments: PropTypes.bool.isRequired,
	assignmentCounts: PropTypes.shape( {
		assigned: PropTypes.object,
		removed: PropTypes.object,
	} ).isRequired,
};

export default getAssignmentsErrorClass;

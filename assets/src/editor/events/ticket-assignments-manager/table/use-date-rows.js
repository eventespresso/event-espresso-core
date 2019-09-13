/**
 * External imports
 */
import PropTypes from 'prop-types';
import warning from 'warning';
import { useMemo } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

import useGenerateDateRow from './use-generate-date-row';
import useGenerateYearRow from './use-generate-year-row';

/**
 * @param {number} dateCount
 * @param {BaseEntity[]} dateEntities
 * @param {BaseEntity[]} ticketEntities
 * @param {Object} ticketDateMap
 * @param {Object} assignedState
 * @param {Object} assignmentCounts
 * @param {boolean} hasNoAssignments
 * @param {Function} setAssignedState
 * @return {Array} array of row data objects
 */
const useDateRows = ( {
	dateCount,
	dateEntities,
	ticketEntities,
	ticketDateMap,
	assignedState,
	assignmentCounts,
	hasNoAssignments,
	setAssignedState,
} ) => {
	const yearRow = useGenerateYearRow( ticketEntities.length );
	const dateRow = useGenerateDateRow(
		dateCount,
		ticketEntities,
		ticketDateMap,
		assignedState,
		assignmentCounts,
		hasNoAssignments,
		setAssignedState
	);
	return useMemo( () => {
		let year = 0;
		const rows = [];
		dateEntities.forEach(
			( eventDate ) => {
				warning(
					isModelEntityOfModel( eventDate, 'datetime' ),
					'Invalid EE Date model object!'
				);
				const dateYear = parseInt(
					eventDate.start.toFormat( 'YYYY' ),
					10
				);
				if ( dateCount > 1 && dateYear > year ) {
					year = dateYear;
					rows.push( yearRow( year ) );
				}
				rows.push( dateRow( eventDate ) );
			}
		);
		return rows;
	}, [
		dateCount,
		dateEntities,
		ticketEntities,
		ticketDateMap,
		assignedState,
		assignmentCounts,
	] );
};

useDateRows.propTypes = {
	dateCount: PropTypes.number.isRequired,
	dateEntities: PropTypes.arrayOf(
		PropTypes.object
	).isRequired,
	ticketEntities: PropTypes.arrayOf(
		PropTypes.object
	).isRequired,
	ticketDateMap: PropTypes.object,
	assignedState: PropTypes.shape( {
		assigned: PropTypes.object,
		removed: PropTypes.object,
	} ).isRequired,
	assignmentCounts: PropTypes.shape( {
		dates: PropTypes.object,
		tickets: PropTypes.object,
	} ).isRequired,
	hasNoAssignments: PropTypes.bool.isRequired,
	setAssignedState: PropTypes.func.isRequired,
};

export default useDateRows;

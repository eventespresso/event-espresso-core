/**
 * External dependencies
 */
import { differenceInMinutes } from 'date-fns';

/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
const isPending = ({ startDate }) => {
	return differenceInMinutes(startDate, new Date()) > 0;
};

export default isPending;

/**
 * External dependencies
 */
import { differenceInMinutes } from 'date-fns';
import { now } from './filters';

/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
const isPending = ({ startDate }) => {
	return differenceInMinutes(startDate, now) > 0;
};

export default isPending;

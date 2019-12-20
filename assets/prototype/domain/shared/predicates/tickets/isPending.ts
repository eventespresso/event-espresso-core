/**
 * External dependencies
 */
import { differenceInMinutes } from 'date-fns';
import { now } from './filters';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
const isPending = ({ startDate }) => {
	return differenceInMinutes(startDate, now) > 0;
};

export default isPending;

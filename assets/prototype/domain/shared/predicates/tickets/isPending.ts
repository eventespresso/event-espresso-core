/**
 * External dependencies
 */
import { differenceInMinutes, parseISO } from 'date-fns';
import { now } from './filters';
import { Ticket } from '../../../eventEditor/data/types';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
const isPending = ({ startDate }: Ticket) => {
	return differenceInMinutes(parseISO(startDate), now) > 0;
};

export default isPending;

/**
 * Internal dependencies
 */
import { Ticket } from '../../../../eventEditor/data/types';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} true if ticket is archived
 */
const isTrashed = (ticket: Ticket): boolean => {
	return ticket.isTrashed;
};

export default isTrashed;

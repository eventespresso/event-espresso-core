/**
 * Internal dependencies
 */
import { Ticket } from '../../../../eventEditor/data/types';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} true if ticket is archived
 */
const isArchived = (ticket: Ticket): boolean => ticket.isTrashed;

export default isArchived;

/**
 * Internal dependencies
 */
import { Ticket } from '../../../eventEditor/data/types';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} true if ticket is archived
 */
const isArchived = (ticket: Ticket): boolean => {
	// TODO: update according to this when it's ready: https://github.com/eventespresso/event-espresso-core/issues/2089
	return ticket['deleted'];
};

export default isArchived;

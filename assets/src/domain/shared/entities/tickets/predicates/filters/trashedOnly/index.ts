/**
 * Internal dependencies
 */
import { isTrashed } from '../../../../../services/predicates';
import { Ticket } from '../../../../../../eventEditor/services/apollo/types';
import { TicketFilterFn } from '../types';

const trashedOnly: TicketFilterFn = (tickets) => {
	return tickets.filter((ticket) => isTrashed<Ticket>(ticket));
};

export default trashedOnly;

/**
 * Internal dependencies
 */
import isTrashed from '../../../../../services/predicates/shared/isTrashed';
import { Ticket } from '../../../../../../eventEditor/services/apollo/types';

const trashedOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter((ticket) => isTrashed<Ticket>(ticket));
};

export default trashedOnly;

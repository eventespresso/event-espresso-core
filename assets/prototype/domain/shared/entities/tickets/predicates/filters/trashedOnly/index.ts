/**
 * Internal dependencies
 */
import isTrashed from '../../../../../predicates/shared/isTrashed';
import { Ticket } from '../../../../../../eventEditor/data/types';

const trashedOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter((ticket) => isTrashed<Ticket>(ticket));
};

export default trashedOnly;

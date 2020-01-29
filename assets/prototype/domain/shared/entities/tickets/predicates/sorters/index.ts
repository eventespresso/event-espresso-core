import { compareAsc, parseISO } from 'date-fns';
import { ascend, prop, propOr, sortWith } from 'ramda';

import { SortTickets } from '../../../../../eventEditor/data/ticket/types';
import { Ticket } from '../../../../../eventEditor/data/types';

type sortFn = (a: Ticket, b: Ticket) => number;
const sortChronologically = (tickets: Ticket[]): Ticket[] => {
	const chronologicPredicate = ({ startDate: dateLeft }: Ticket, { startDate: dateRight }: Ticket): number => {
		return compareAsc(parseISO(dateLeft), parseISO(dateRight));
	};
	const sortPredicates: sortFn[] = [ascend(prop('name')), ascend(prop('id')), chronologicPredicate];
	return sortWith(sortPredicates, tickets);
};

interface SortTicketsProps {
	tickets: Ticket[];
	order?: SortTickets;
}

const sorters = ({ tickets, order = SortTickets.chronologically }: SortTicketsProps): Ticket[] => {
	switch (order) {
		case SortTickets.chronologically:
			return sortChronologically(tickets);
		case SortTickets.byName:
			return sortWith([ascend(propOr(null, 'name'))], tickets);
		case SortTickets.byId:
			return sortWith([ascend(prop('id'))], tickets);
		case SortTickets.byOrder:
			return sortWith([ascend(propOr(null, 'order'))], tickets);
	}
};

export default sorters;

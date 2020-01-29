import { compareAsc, parseISO } from 'date-fns';
import { ascend, prop, propOr, sortWith } from 'ramda';

import { SortTicketsBy } from '../../../../../eventEditor/data/ticket/types';
import { Ticket } from '../../../../../eventEditor/data/types';

const sortChronologically = (tickets: Ticket[]): Ticket[] => {
	const chronologicPredicate = ({ startDate: dateLeft }: Ticket, { startDate: dateRight }: Ticket): any => {
		return compareAsc(parseISO(dateLeft), parseISO(dateRight));
	};
	const sortPredicates: any[] = [ascend(prop('name')), ascend(prop('id')), chronologicPredicate];
	return sortWith(sortPredicates, tickets);
};

interface SortTickets {
	tickets: Ticket[];
	order?: SortTicketsBy;
}

const sorters = ({ tickets, order = SortTicketsBy.chronologically }: SortTickets): Ticket[] => {
	switch (order) {
		case SortTicketsBy.chronologically:
			return sortChronologically(tickets);
		case SortTicketsBy.byName:
			return sortWith([ascend(propOr(null, 'name'))], tickets);
		case SortTicketsBy.byId:
			return sortWith([ascend(prop('id'))], tickets);
		case SortTicketsBy.byOrder:
			return sortWith([ascend(propOr(null, 'order'))], tickets);
	}
};

export default sorters;

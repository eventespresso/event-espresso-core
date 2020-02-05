import { compareAsc, parseISO } from 'date-fns';
import { ascend, prop, propOr, sort, sortWith } from 'ramda';

import { SortTicketsBy } from '../../../../../eventEditor/data/ticket/types';
import { Ticket } from '../../../../../eventEditor/data/types';

const sortChronologically = (tickets: Ticket[]): Ticket[] => {
	const chronologicPredicate = ({ startDate: dateLeft }: Ticket, { startDate: dateRight }: Ticket): number => {
		return compareAsc(parseISO(dateLeft), parseISO(dateRight));
	};
	return sort(chronologicPredicate, tickets);
};

interface SortTicketsByProps {
	tickets: Ticket[];
	order?: SortTicketsBy;
}

const sorters = ({ tickets, order = SortTicketsBy.date }: SortTicketsByProps): Ticket[] => {
	switch (order) {
		case SortTicketsBy.date:
			return sortChronologically(tickets);
		case SortTicketsBy.name:
			return sortWith([ascend(propOr(null, 'name'))], tickets);
		case SortTicketsBy.id:
			return sortWith([ascend(prop('id'))], tickets);
		case SortTicketsBy.order:
			return sortWith([ascend(propOr(null, 'order'))], tickets);
	}
};

export default sorters;

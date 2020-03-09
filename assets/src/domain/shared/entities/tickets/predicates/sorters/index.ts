import { compareAsc, parseISO } from 'date-fns';
import { ascend, prop, propOr, sort, sortWith } from 'ramda';

import { Ticket } from '@edtrServices/apollo';
import { SortBy } from '@sharedServices/filterState';

const sortByDate = (tickets: Ticket[]): Ticket[] => {
	const sortByDatePredicate = ({ startDate: dateLeft }: Ticket, { startDate: dateRight }: Ticket): number => {
		return compareAsc(parseISO(dateLeft), parseISO(dateRight));
	};
	return sort(sortByDatePredicate, tickets);
};

interface SortByProps {
	tickets: Ticket[];
	sortBy?: SortBy;
}

const sorters = ({ tickets, sortBy = 'date' }: SortByProps): Ticket[] => {
	switch (sortBy) {
		case 'date':
			return sortByDate(tickets);
		case 'name':
			return sortWith([ascend(propOr(null, 'name'))], tickets);
		case 'id':
			return sortWith([ascend(prop('id'))], tickets);
		case 'order':
			return sortWith([ascend(propOr(null, 'order'))], tickets);
	}
};

export default sorters;

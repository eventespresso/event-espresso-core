/**
 * External dependencies
 */
import { ascend, prop, propOr, sortWith } from 'ramda';

/**
 * Internal dependencies
 */
import { SortTicketsBy } from '../../../../eventEditor/data/ticket/types';
import { Ticket } from '../../../../eventEditor/data/types';

const sortTicketsList = (tickets: Ticket[], order = SortTicketsBy.chronologically): Ticket[] => {
	switch (order) {
		case SortTicketsBy.chronologically:
			return sortWith([ascend(propOr(null, 'name')), ascend(prop('id'))], tickets);
		case SortTicketsBy.byName:
			return sortWith([ascend(propOr(null, 'name'))], tickets);
		case SortTicketsBy.byId:
			return sortWith([ascend(prop('id'))], tickets);
		case SortTicketsBy.byOrder:
			return sortWith([ascend(propOr(null, 'order'))], tickets);
	}
};

export default sortTicketsList;

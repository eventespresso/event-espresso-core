/**
 * External dependencies
 */
import { ascend, prop, propOr, sortWith } from 'ramda';

/**
 * Internal dependencies
 */
import { SortTickets } from '../../../../eventEditor/data/ticket/types';
import { Ticket } from '../../../../eventEditor/data/types';

const sortTicketsList = (tickets: Ticket[], order = SortTickets.chronologically) => {
	switch (order) {
		case SortTickets.chronologically:
			return sortWith([ascend(propOr(null, 'name')), ascend(prop('id'))], tickets);
		case SortTickets.byName:
			return sortWith([ascend(propOr(null, 'name'))], tickets);
		case SortTickets.byId:
			return sortWith([ascend(prop('id'))], tickets);
		case SortTickets.byOrder:
			return sortWith([ascend(propOr(null, 'order'))], tickets);
	}
};

export default sortTicketsList;

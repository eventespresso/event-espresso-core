/**
 * External dependencies
 */
import { ascend, prop, propOr, sortWith } from 'ramda';

/**
 * Internal dependencies
 */
import { TicketsSortedBy } from '../../../../eventEditor/data/ticket/types';
import { Ticket } from '../../../../eventEditor/data/types';

const sortTicketsList = (tickets: Ticket[], order = TicketsSortedBy.chronologically) => {
	switch (order) {
		case TicketsSortedBy.chronologically:
			return sortWith([ascend(propOr(null, 'name')), ascend(prop('id'))], tickets);
		case TicketsSortedBy.byName:
			return sortWith([ascend(propOr(null, 'name'))], tickets);
		case TicketsSortedBy.byId:
			return sortWith([ascend(prop('id'))], tickets);
		case TicketsSortedBy.byOrder:
			return sortWith([ascend(propOr(null, 'order'))], tickets);
	}
};

export default sortTicketsList;

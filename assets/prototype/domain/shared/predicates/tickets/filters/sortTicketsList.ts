/**
 * External dependencies
 */
import { ascend, prop, sortWith } from 'ramda';

/**
 * Internal dependencies
 */
import { DatesSortedBy } from '../../../../eventEditor/data/date/types';

const sortTicketsList = (tickets, order = 'chronologically') => {
	switch (order) {
		case DatesSortedBy.chronologically:
			return sortWith([ascend(prop('name')), ascend(prop('id'))], tickets);
		case DatesSortedBy.byName:
			return sortWith([ascend(prop('name'))], tickets);
		case DatesSortedBy.byId:
			return sortWith([ascend(prop('id'))], tickets);
		case DatesSortedBy.byOrder:
			return sortWith([ascend(prop('order'))], tickets);
	}
};

export default sortTicketsList;

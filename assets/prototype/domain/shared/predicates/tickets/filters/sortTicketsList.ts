/**
 * External dependencies
 */
import { ascend, prop, sortWith } from 'ramda';

const sortTicketsList = (tickets, order = 'chronologically') => {
	switch (order) {
		case 'chronologically':
			return sortWith([ascend(prop('name')), ascend(prop('id'))], tickets);
		case 'by-name':
			return sortWith([ascend(prop('name'))], tickets);
		case 'by-id':
			return sortWith([ascend(prop('id'))], tickets);
		case 'by-order':
			return sortWith([ascend(prop('order'))], tickets);
	}
};

export default sortTicketsList;

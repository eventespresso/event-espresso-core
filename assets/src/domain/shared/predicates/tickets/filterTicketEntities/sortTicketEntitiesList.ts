/**
 * External dependencies
 */
import { ascend, prop, sortWith } from 'ramda';

const sortTicketEntitiesList = (ticketEntities, order = 'chronologically') => {
	switch (order) {
		case 'chronologically':
			return sortWith([ascend(prop('name')), ascend(prop('id'))], ticketEntities);
		case 'by-name':
			return sortWith([ascend(prop('name'))], ticketEntities);
		case 'by-id':
			return sortWith([ascend(prop('id'))], ticketEntities);
		case 'by-order':
			return sortWith([ascend(prop('order'))], ticketEntities);
	}
};

export default sortTicketEntitiesList;

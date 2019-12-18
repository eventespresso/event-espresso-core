/**
 * External dependencies
 */
import { filter } from 'lodash';

/**
 * Internal dependencies
 */
import { isOnSale, isPending } from '../../../../../application/entities/ticket';
import nextOnSaleOrPendingOnly from './nextOnSaleOrPendingOnly';
import percentSoldAtOrAbove from './percentSoldAtOrAbove';
import soldOutOnly from './soldOutOnly';

interface FilterTicketEntities {
	ticketEntities: any[];
	show?: string;
}

/**
 * filterTicketEntities
 * reduces tickets array based on value of the "show" filter
 *
 * @param {Array} ticketEntities    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
const filterTicketEntities = ({ ticketEntities, show = 'on-sale-and-pending' }: FilterTicketEntities) => {
	switch (show) {
		case 'all':
			return ticketEntities;
		case 'on-sale-and-pending':
			return filter(ticketEntities, function(ticketEntity) {
				return isOnSale(ticketEntity) || isPending(ticketEntity);
			});
		case 'on-sale-only':
			return filter(ticketEntities, function(ticketEntity) {
				return isOnSale(ticketEntity);
			});
		case 'pending-only':
			return filter(ticketEntities, function(ticketEntity) {
				return isPending(ticketEntity);
			});
		case 'next-on-sale-or-pending-only':
			return nextOnSaleOrPendingOnly(ticketEntities);
		case 'sold-out-only':
			return soldOutOnly(ticketEntities);
		case 'above-90-sold':
			return percentSoldAtOrAbove({ maxQuantity: 90, ticketEntities });
		// case 'above-75-sold':
		// 	return filter(ticketEntities, function(ticketEntity) {
		// 		return percentSoldAtOrAbove(ticketEntity, 75);
		// 	});
		// case 'above-50-sold':
		// 	return filter(ticketEntities, function(ticketEntity) {
		// 		return percentSoldAtOrAbove(ticketEntity, 50);
		// 	});
		// case 'below-50-sold':
		// 	return filter(ticketEntities, function(ticketEntity) {
		// 		return percentSoldBelow(ticketEntity, 50);
		// 	});
		// case 'expired-only':
		// 	return filter(ticketEntities, function(ticketEntity) {
		// 		return ticketModel.isExpired(ticketEntity);
		// 	});
		// case 'archived-only':
		// 	return filter(ticketEntities, function(ticketEntity) {
		// 		return ticketModel.isArchived(ticketEntity);
		// 	});
	}
	return ticketEntities;
};

export default filterTicketEntities;

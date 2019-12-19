/**
 * Internal dependencies
 */

import isOnSale from '../isOnSale';
import isPending from '../isPending';

const onSaleAndPending = (ticketEntities: any[]) => {
	return ticketEntities.filter((ticketEntity) => {
		return isOnSale(ticketEntity) || isPending(ticketEntity);
	});
};

export default onSaleAndPending;

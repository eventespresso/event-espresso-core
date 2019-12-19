/**
 * Internal dependencies
 */
import isOnSale from '../isOnSale';

const onSaleOnly = (ticketEntities: any[]) => {
	return ticketEntities.filter((ticketEntity) => isOnSale(ticketEntity));
};

export default onSaleOnly;

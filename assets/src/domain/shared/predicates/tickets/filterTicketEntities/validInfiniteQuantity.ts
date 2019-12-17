/**
 * External dependencies
 */
import { differenceInMinutes } from 'date-fns';

/**
 * @param {Object} ticketEntity    event ticket object
 * @return {boolean} true if qty property is valid and unlimited
 */
const validInfiniteQuantity = (ticketEntity) => {
	return (
		isModelEntityOfModel(ticketEntity, 'ticket') && (ticketEntity.qty === 'INF' || ticketEntity.qty === Infinity)
	);
};

export default validInfiniteQuantity;

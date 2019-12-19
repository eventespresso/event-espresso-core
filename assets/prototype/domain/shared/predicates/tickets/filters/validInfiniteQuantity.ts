/**
 * @param {Object} ticketEntity    event ticket object
 * @return {boolean} true if qty property is valid and unlimited
 */
const validInfiniteQuantity = (ticketEntity) => {
	return ticketEntity.qty === 'INF' || ticketEntity.qty === Infinity;
};

export default validInfiniteQuantity;

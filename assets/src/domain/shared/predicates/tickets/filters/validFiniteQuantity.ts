/**
 * @param {Object} ticketEntity    event ticket object
 * @return {boolean} true if qty property is valid and NOT infinite
 */
const validFiniteQuantity = (ticketEntity) => {
	return ticketEntity.qty !== 'INF' && ticketEntity.qty !== Infinity && parseInt(ticketEntity.qty, 10) > 0;
};

export default validFiniteQuantity;

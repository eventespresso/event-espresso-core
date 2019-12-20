/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and NOT infinite
 */
const validFiniteQuantity = (ticket) => {
	return ticket.qty !== 'INF' && ticket.qty !== Infinity && parseInt(ticket.qty, 10) > 0;
};

export default validFiniteQuantity;

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and unlimited
 */
const validInfiniteQuantity = (ticket) => {
	return ticket.qty === 'INF' || ticket.qty === Infinity;
};

export default validInfiniteQuantity;

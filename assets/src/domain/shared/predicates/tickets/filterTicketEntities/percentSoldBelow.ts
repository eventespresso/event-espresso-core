/**
 * @param {Object} ticketEntity    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty less than than qty
 */
const percentSoldBelow = (ticketEntity, maxQuantity) => {
	return (
		validInfiniteQuantity(ticketEntity) ||
		(validFiniteQuantity(ticketEntity) &&
			parseInt(ticketEntity.sold, 10) / parseInt(ticketEntity.qty, 10) < maxQuantity / 100)
	);
};

export default percentSoldBelow;

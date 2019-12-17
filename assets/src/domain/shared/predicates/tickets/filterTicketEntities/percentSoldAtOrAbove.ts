/**
 * @param {Object} ticketEntity    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty >= maxQuantity
 */
const percentSoldAtOrAbove = (ticketEntity, maxQuantity) => {
	return (
		validFiniteQuantity(ticketEntity) &&
		parseInt(ticketEntity.sold, 10) / parseInt(ticketEntity.qty, 10) >= maxQuantity / 100
	);
};

export default percentSoldAtOrAbove;

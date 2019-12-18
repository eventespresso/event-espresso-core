import validFiniteQuantity from './validFiniteQuantity';

type PercentSoldAtOrAboveProps = {
	maxQuantity: number;
	ticketEntities: any[];
};

/**
 * @param {Object} ticketEntity    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty >= maxQuantity
 */
const percentSoldAtOrAbove = ({ maxQuantity, ticketEntities }: PercentSoldAtOrAboveProps) => {
	const filterFn = (ticketEntity) => {
		return (
			validFiniteQuantity(ticketEntity) &&
			parseInt(ticketEntity.sold, 10) / parseInt(ticketEntity.qty, 10) >= maxQuantity / 100
		);
	};

	return ticketEntities.filter(filterFn);
};

export default percentSoldAtOrAbove;

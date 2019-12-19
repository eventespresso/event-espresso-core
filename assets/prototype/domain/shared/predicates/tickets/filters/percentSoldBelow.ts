import validFiniteQuantity from './validFiniteQuantity';
import validInfiniteQuantity from './validInfiniteQuantity';

type PercentSoldAtOrAboveProps = {
	maxQuantity: number;
	ticketEntities: any[];
};

/**
 * @param {Object} ticketEntity    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty less than than qty
 */
const percentSoldBelow = ({ maxQuantity, ticketEntities }: PercentSoldAtOrAboveProps) => {
	const filterFn = (ticketEntity) => {
		return (
			validInfiniteQuantity(ticketEntity) ||
			(validFiniteQuantity(ticketEntity) &&
				parseInt(ticketEntity.sold, 10) / parseInt(ticketEntity.qty, 10) < maxQuantity / 100)
		);
	};

	return ticketEntities.filter(filterFn);
};

export default percentSoldBelow;

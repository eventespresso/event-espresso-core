/**
 * Internal dependencies
 */
import percentSoldAtOrAbove from './percentSoldAtOrAbove';

const soldOutOnly = (ticketEntities: any[]) => {
	return ticketEntities.filter((ticketEntity) => {
		return ticketEntity.isSoldOut || percentSoldAtOrAbove(ticketEntity, 100);
	});
};

export default soldOutOnly;

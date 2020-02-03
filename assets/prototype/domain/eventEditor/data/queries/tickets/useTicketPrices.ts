import useRelations from '../../../../../application/services/apollo/relations/useRelations';
import usePrices from '../prices/usePrices';
import { Price, EntityId } from '../../types';
/**
 * A custom react hook for retrieving the related prices
 * for the given `ticket` identified by `ticket.id`
 *
 * @param {string}  ticketId ticket.id
 */
const useTicketPrices = (ticketId: EntityId): Price[] => {
	const { getRelations } = useRelations();
	// get related price Ids for this ticket
	const relatedPriceIds = getRelations({
		entity: 'tickets',
		entityId: ticketId,
		relation: 'prices',
	});

	// get price objects.
	const relatedPrices = usePrices(relatedPriceIds);

	return relatedPriceIds.length ? relatedPrices : [];
};

export default useTicketPrices;

import useRelations from '../../../../../application/services/apollo/relations/useRelations';
import usePrices from '../prices/usePrices';
import { Price, EntityId } from '../../types';
import { EntityItemProps, ReadQueryOptions } from '../types';
/**
 * A custom react hook for retrieving the related prices
 * for the given `ticket` identified by `ticket.id`
 *
 * @param {string}  ticketId ticket.id
 */
const useTicketPrices = (ticketId: EntityId): Price[] => {
	const { getRelations } = useRelations();
	// get related price Ids for this ticket
	const relatedPriceIds: EntityId[] = getRelations({
		entity: 'tickets',
		entityId: ticketId,
		relation: 'prices',
	});

	// get price objects.
	const relatedPrices: Price[] = usePrices(relatedPriceIds);

	return relatedPrices;
};

export default useTicketPrices;

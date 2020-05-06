import { EntityId } from '@dataServices/types';
import { Price } from '../../types';
import { useRelatedPrices } from '../prices';
/**
 * A custom react hook for retrieving the related prices
 * for the given `ticket` identified by `ticket.id`
 *
 * @param {string}  ticketId ticket.id
 */
const useTicketPrices = (ticketId: EntityId): Price[] => {
	// get price objects.
	const relatedPrices = useRelatedPrices({
		entity: 'tickets',
		entityId: ticketId,
	});

	return relatedPrices;
};

export default useTicketPrices;

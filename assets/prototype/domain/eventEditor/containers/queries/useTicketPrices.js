import useRelations from '../../../../infrastructure/services/relations/useRelations';
import usePrices from './usePrices';
/**
 * A custom react hook for retrieving the related prices
 * for the given `ticket` identified by `ticket.id`
 *
 * @param {string}  ticketId ticket.id
 */
const useTicketPrices = (ticketId) => {
	const { getRelations } = useRelations();
	// get related price Ids for this ticket
	const relatedPriceIds = getRelations({
		entity: 'tickets',
		entityId: ticketId,
		relation: 'prices',
	});

	// get price objects.
	const relatedPrices = usePrices(relatedPriceIds);

	return relatedPrices;
};

export default useTicketPrices;

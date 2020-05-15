import { useCallback } from 'react';

import parsedAmount from '@appServices/utilities/money/parsedAmount';
import toBoolean from '@appServices/utilities/converters/toBoolean';
import { useRelations } from '@appServices/apollo/relations';
import { copyTicketFields } from '@sharedEntities/tickets/predicates/updatePredicates';
import { isTicketInputField } from '@sharedEntities/tickets/predicates/selectionPredicates';
import { useDataState } from '../data';
import { shouldUpdateTicket } from '../utils';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { useTicketItem } from '@edtrServices/apollo/queries';
import useMutatePrices from './useMutatePrices';

const useOnSubmitPrices = (): (() => Promise<void>) => {
	const { deletedPrices: deletedPriceIds, prices, ticket } = useDataState();

	const { updateEntity: updateTicket } = useTicketMutator();
	const existingTicket = useTicketItem({ id: ticket.id });
	const { getRelations } = useRelations();
	const mutatePrices = useMutatePrices();

	// Async to make sure that prices are handled before updating the ticket.
	return useCallback(async () => {
		const relatedPriceIds = await mutatePrices(prices, deletedPriceIds);

		const normalizedTicketFields = {
			...copyTicketFields(ticket, isTicketInputField),
			id: ticket.id,
			price: parsedAmount(ticket.price || 0),
			reverseCalculate: toBoolean(ticket.reverseCalculate),
		};
		// Finally update the ticket and its price relation, if needed
		const ticketNeedsUpdate = shouldUpdateTicket({
			existingTicket,
			getRelations,
			newTicket: ticket,
			relatedPriceIds,
		});
		if (ticketNeedsUpdate) {
			updateTicket({ ...normalizedTicketFields, prices: relatedPriceIds });
		}
	}, [deletedPriceIds, existingTicket, getRelations, mutatePrices, prices, ticket, updateTicket]);
};

export default useOnSubmitPrices;

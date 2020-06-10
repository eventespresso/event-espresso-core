import { useCallback } from 'react';

import { useTicketPrices } from '@edtrServices/apollo/queries';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { copyTicketFields } from '@sharedEntities/tickets/predicates/updatePredicates';
import { isTicketInputField } from '@sharedEntities/tickets/predicates/selectionPredicates';
import { useRelations } from '@application/services/apollo/relations';
import { Ticket } from '@edtrServices/apollo';
import usePriceToTpcModifier from '@edtrUI/tickets/ticketPriceCalculator/hooks/usePriceToTpcModifier';
import { useMutatePrices } from '@edtrUI/tickets/ticketPriceCalculator/hooks';
import { isDefaultTax } from '@sharedEntities/prices/predicates/selectionPredicates';

const useCopyTicket = (ticket: Ticket): VoidFunction => {
	const relatedPrices = useTicketPrices(ticket?.id);
	const { createEntity } = useTicketMutator();
	const { getRelations } = useRelations();
	const convertPriceToTpcModifier = usePriceToTpcModifier();
	const mutatePrices = useMutatePrices();

	return useCallback(() => {
		const prices = relatedPrices.map((price) => {
			const priceModifier = convertPriceToTpcModifier(price);
			// if it's a default tax
			if (isDefaultTax(price)) {
				// return without cloning
				return priceModifier;
			}
			return {
				...priceModifier,
				// clone it
				isNew: true,
				// avoid default price getting duplicated
				isDefault: false,
			};
		});

		// get the related datetime ids
		const datetimes = getRelations({
			entity: 'tickets',
			entityId: ticket.id,
			relation: 'datetimes',
		});

		const newTicket = copyTicketFields(ticket, isTicketInputField);

		// create the prices
		mutatePrices(prices).then((relatedPriceIds) => {
			// add related prices and datetimes to mutation input
			const input = { ...newTicket, prices: relatedPriceIds, datetimes };
			// now finally create the ticket
			createEntity(input);
		});
	}, [convertPriceToTpcModifier, createEntity, getRelations, mutatePrices, relatedPrices, ticket]);
};

export default useCopyTicket;

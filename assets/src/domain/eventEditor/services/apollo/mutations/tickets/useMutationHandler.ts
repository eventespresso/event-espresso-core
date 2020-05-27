import { useCallback } from 'react';

import useMutationVariables from './useMutationVariables';
import useOnCreateTicket from './useOnCreateTicket';
import useOnDeleteTicket from './useOnDeleteTicket';
import useOnUpdateTicket from './useOnUpdateTicket';
import useOptimisticResponse from './useOptimisticResponse';
import { DEFAULT_TICKET_LIST_DATA as DEFAULT_LIST_DATA } from '@edtrServices/apollo/queries';
import { MutationHandler, MutationUpdater } from '../types';
import { MutationType } from '@appServices/apollo/mutations';
import { TicketsList, Ticket } from '@edtrServices/apollo/types';
import { useTicketQueryOptions } from '@edtrServices/apollo/queries/tickets';
import { getGuids } from '@appServices/predicates';
import { TicketCommonInput } from './types';

type MH = MutationHandler<Ticket, TicketCommonInput>;

const useMutationHandler = (): MH => {
	const options = useTicketQueryOptions();

	const onCreateTicket = useOnCreateTicket();
	const onUpdateTicket = useOnUpdateTicket();
	const onDeleteTicket = useOnDeleteTicket();

	const getMutationVariables = useMutationVariables();
	const getOptimisticResponse = useOptimisticResponse();

	const onUpdate = useCallback<MutationUpdater<Ticket, TicketCommonInput>>(
		({ proxy, entity, input, mutationType }) => {
			// extract prices data to avoid
			// it going to tickets cache
			const { prices, ...ticket } = entity;

			// Read the existing data from cache.
			let data: TicketsList;
			try {
				data = proxy.readQuery(options);
			} catch (error) {
				data = null;
			}
			const tickets = data?.espressoTickets || DEFAULT_LIST_DATA;
			const datetimeIds = input?.datetimes || [];

			const priceIds: string[] = getGuids(prices?.nodes || []);

			switch (mutationType) {
				case MutationType.Create:
					onCreateTicket({ proxy, tickets, ticket, datetimeIds, prices });
					break;
				case MutationType.Update:
					onUpdateTicket({ proxy, tickets, ticket, datetimeIds, priceIds });
					break;
				case MutationType.Delete:
					onDeleteTicket({ proxy, tickets, ticket, deletePermanently: input?.deletePermanently });
					break;
			}
		},
		[onCreateTicket, onDeleteTicket, onUpdateTicket, options]
	);
	const mutator = useCallback<MH>(
		(mutationType, input) => {
			const variables = getMutationVariables(mutationType, input);
			const optimisticResponse = getOptimisticResponse(mutationType, input);

			return { variables, optimisticResponse, onUpdate };
		},
		[getMutationVariables, getOptimisticResponse, onUpdate]
	);

	return mutator;
};

export default useMutationHandler;

import { pathOr } from 'ramda';

import useMutationVariables from './useMutationVariables';
import useOnCreateTicket from './useOnCreateTicket';
import useOnDeleteTicket from './useOnDeleteTicket';
import useOnUpdateTicket from './useOnUpdateTicket';
import useOptimisticResponse from './useOptimisticResponse';
import { DEFAULT_TICKET_LIST_DATA as DEFAULT_LIST_DATA } from '@edtrServices/apollo/queries';
import { EntityId } from '@appServices/apollo/types';
import { MutationHandler, OnUpdateFnOptions } from '../types';
import { MutationType } from '@appServices/apollo/mutations';
import { Ticket, TicketEdge, Price, TicketsList } from '@edtrServices/apollo/types';
import { useTicketQueryOptions } from '@edtrServices/apollo/queries/tickets';
import { getGuids } from '@appServices/predicates';

const useTicketMutationHandler = (): MutationHandler => {
	const options = useTicketQueryOptions();

	const onCreateTicket = useOnCreateTicket();
	const onUpdateTicket = useOnUpdateTicket();
	const onDeleteTicket = useOnDeleteTicket();

	const getMutationVariables = useMutationVariables();
	const getOptimisticResponse = useOptimisticResponse();

	const mutator: MutationHandler = (mutationType, input) => {
		const variables = getMutationVariables(mutationType, input);
		const optimisticResponse = getOptimisticResponse(mutationType, input);

		const onUpdate = ({ proxy, entity }: OnUpdateFnOptions<Ticket>): void => {
			// extract prices data to avoid
			// it going to tickets cache
			const { prices, ...ticket } = entity;

			// Read the existing data from cache.
			let data: TicketsList;
			try {
				data = proxy.readQuery<TicketsList>(options);
			} catch (error) {
				data = null;
			}
			const tickets = pathOr<TicketEdge>(DEFAULT_LIST_DATA, ['espressoTickets'], data);
			const datetimeIds = pathOr<Array<EntityId>>([], ['datetimes'], input);

			const priceIds = getGuids(pathOr<Price[]>([], ['nodes'], prices));

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
		};

		return { variables, optimisticResponse, onUpdate };
	};

	return mutator;
};

export default useTicketMutationHandler;

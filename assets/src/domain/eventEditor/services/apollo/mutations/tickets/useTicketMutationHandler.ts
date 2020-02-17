import { pathOr } from 'ramda';

import useTicketQueryOptions from '../../queries/tickets/useTicketQueryOptions';
import useOnCreateTicket from './useOnCreateTicket';
import useOnUpdateTicket from './useOnUpdateTicket';
import useOnDeleteTicket from './useOnDeleteTicket';
import { MutationType } from '../../../../../../application/services/apollo/mutations';
import { DEFAULT_TICKET_LIST_DATA as DEFAULT_LIST_DATA } from '../../queries';
import { EntityId, Ticket, TicketEdge, Price, TicketsList } from '../../types';
import useOptimisticResponse from './useOptimisticResponse';
import useMutationVariables from './useMutationVariables';
import { MutationHandler, OnUpdateFnOptions } from '../types';

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

			const priceIds = pathOr<Price[]>([], ['nodes'], prices).map(({ id }: Price) => id);

			switch (mutationType) {
				case MutationType.Create:
					onCreateTicket({ proxy, tickets, ticket, datetimeIds, prices });
					break;
				case MutationType.Update:
					onUpdateTicket({ ticket, datetimeIds, priceIds });
					break;
				case MutationType.Delete:
					onDeleteTicket({ proxy, tickets, ticket });
					break;
			}
		};

		return { variables, optimisticResponse, onUpdate };
	};

	return mutator;
};

export default useTicketMutationHandler;

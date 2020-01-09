import { pathOr } from 'ramda';
import { OperationVariables } from 'apollo-client';

import useTicketQueryOptions from '../../queries/tickets/useTicketQueryOptions';
import useOnCreateTicket from './useOnCreateTicket';
import useOnUpdateTicket from './useOnUpdateTicket';
import useOnDeleteTicket from './useOnDeleteTicket';
import {
	Mutator,
	MutationType,
	MutationInput,
	OnUpdateFnOptions,
	MutatorGeneratedObject,
} from '../../../../../application/services/apollo/mutations/types';
import { ReadQueryOptions } from '../../queries/types';
import { DEFAULT_ENTITY_LIST_DATA as DEFAULT_LIST_DATA } from '../../queries';
import { Ticket, TicketEdge, Price } from '../../types';
import { TicketMutationCallbackFn } from '../types';

/**
 *
 */
const useTicketMutator = (): Mutator => {
	const options: ReadQueryOptions = useTicketQueryOptions();

	const onCreateTicket: TicketMutationCallbackFn = useOnCreateTicket();
	const onUpdateTicket: TicketMutationCallbackFn = useOnUpdateTicket();
	const onDeleteTicket: TicketMutationCallbackFn = useOnDeleteTicket();

	const createVariables = (mutationType: MutationType, input: MutationInput): OperationVariables => {
		const mutationInput: MutationInput = {
			clientMutationId: `${mutationType}_TICKET`,
			...input,
		};

		return {
			input: mutationInput,
		};
	};

	const mutator = (mutationType: MutationType, input: MutationInput): MutatorGeneratedObject => {
		const variables: OperationVariables = createVariables(mutationType, input);
		/**
		 * @todo update optimisticResponse
		 */
		let optimisticResponse: any;

		const onUpdate = ({ proxy, entity }: OnUpdateFnOptions<Ticket>): void => {
			// extract prices data to avoid
			// it going to tickets cache
			const { prices, ...ticket } = entity;

			// Read the existing data from cache.
			let data: any;
			try {
				data = proxy.readQuery(options);
			} catch (error) {
				data = {};
			}
			const tickets = pathOr<TicketEdge>(DEFAULT_LIST_DATA('Tickets'), ['espressoTickets'], data);
			const { datetimes: datetimeIds = [] } = input;

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

export default useTicketMutator;

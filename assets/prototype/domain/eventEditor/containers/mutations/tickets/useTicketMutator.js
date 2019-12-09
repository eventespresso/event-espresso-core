import { pathOr } from 'ramda';

import useTicketQueryOptions from './useTicketQueryOptions';
import useOnCreateTicket from './useOnCreateTicket';
import useOnUpdateTicket from './useOnUpdateTicket';
import useOnDeleteTicket from './useOnDeleteTicket';

/**
 *
 */
const useTicketMutator = () => {
	const options = useTicketQueryOptions();

	const onCreateTicket = useOnCreateTicket();
	const onUpdateTicket = useOnUpdateTicket();
	const onDeleteTicket = useOnDeleteTicket();

	const createVariables = (mutationType, input) => {
		const mutationInput = {
			clientMutationId: `${mutationType}_TICKET`,
			...input,
		};

		return {
			input: mutationInput,
		};
	};

	const mutator = (mutationType, input) => {
		const variables = createVariables(mutationType, input);
		/**
		 * @todo update optimisticResponse
		 */
		let optimisticResponse;

		const onUpdate = ({ proxy, entity }) => {
			// extract prices data to avoid
			// it going to tickets cache
			const { prices: defaultPrices, ...ticket } = entity;
			const prices = pathOr([], ['nodes'], defaultPrices);

			// Read the existing data from cache.
			const { tickets = {} } = proxy.readQuery(options);
			const { datetimes: datetimeIds = [], prices: inputPriceIds = [] } = input;

			const priceIds = inputPriceIds || prices.map(({ id }) => id);

			switch (mutationType) {
				case 'CREATE':
					onCreateTicket({ proxy, tickets, ticket, datetimeIds, prices });
					break;
				case 'UPDATE':
					onUpdateTicket({ ticket, datetimeIds, priceIds });
					break;
				case 'DELETE':
					onDeleteTicket({ proxy, tickets, ticket });
					break;
			}
		};

		return { variables, optimisticResponse, onUpdate };
	};

	return mutator;
};

export default useTicketMutator;

import { useCallback } from 'react';
import { pathOr } from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import { v4 as uuidv4 } from 'uuid';

import { GET_TICKET } from '@edtrServices/apollo/queries';
import { MutationType, MutationInput } from '@appServices/apollo/mutations/types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@sharedConstants/defaultDates';
import { Ticket, TicketItem } from '@edtrServices/apollo/types';
import { removeNullAndUndefined } from '@appServices/utilities/predicates';
import { ucFirst } from '@appServices/utilities/text';

export const TICKET_DEFAULTS: Ticket = {
	id: '',
	dbId: 0,
	cacheId: uuidv4(),
	description: '',
	endDate: PLUS_TWO_MONTHS.toISOString(),
	isSoldOut: false,
	isTrashed: false,
	isDefault: false,
	isExpired: false,
	isFree: false,
	isOnSale: false,
	isPending: true,
	isRequired: false,
	isTaxable: false,
	max: -1,
	min: 0,
	name: '',
	order: 0,
	price: null,
	prices: null,
	quantity: -1,
	registrationCount: 0,
	reserved: 0,
	reverseCalculate: true,
	sold: 0,
	startDate: PLUS_ONE_MONTH.toISOString(),
	uses: -1,
};

type OptimisticResCb = (mutationType: MutationType, input: MutationInput) => any;

const useOptimisticResponse = (): OptimisticResCb => {
	const client = useApolloClient();

	return useCallback<OptimisticResCb>((mutationType, input) => {
		let espressoTicket: Partial<Ticket> = {
			__typename: 'EspressoTicket',
		};
		// Get rid of null or undefined values
		const filteredInput = removeNullAndUndefined(input);
		let data: TicketItem, ticket: Ticket;
		switch (mutationType) {
			case MutationType.Create:
				espressoTicket = {
					...espressoTicket,
					...TICKET_DEFAULTS,
					...filteredInput,
					prices: null,
				};
				break;
			case MutationType.Delete:
				espressoTicket = {
					...espressoTicket,
					...filteredInput,
				};
				break;
			case MutationType.Update:
				try {
					data = client.readQuery<TicketItem>({
						query: GET_TICKET,
						variables: {
							id: input.id,
						},
					});
				} catch (error) {
					// do nothing
				}
				ticket = pathOr<Ticket>(null, ['ticket'], data);

				espressoTicket = {
					...espressoTicket,
					...ticket,
					...filteredInput,
					cacheId: uuidv4(),
					prices: null,
				};
		}

		const lcMutationtype = mutationType.toLowerCase();
		const ucFirstMutationtype = ucFirst(lcMutationtype);

		// e.g. "deleteEspressoTicket", "createEspressoTicket"
		const mutation = `${lcMutationtype}EspressoTicket`;

		return {
			__typename: 'RootMutation',
			[mutation]: {
				__typename: `${ucFirstMutationtype}EspressoTicketPayload`,
				espressoTicket,
			},
		};
	}, []);
};

export default useOptimisticResponse;

import { useCallback } from 'react';
import { pathOr } from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import { MutationType, MutationInput } from '../../../../../application/services/apollo/mutations/types';
import { ucFirst } from '../../../../../application/utilities/text';
import { queries } from '../../queries';
import { Ticket, TicketItem } from '../../types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/defaultDates';

const { GET_TICKET } = queries;

export const TICKET_DEFAULTS: Ticket = {
	id: 'NEW',
	dbId: 0,
	description: '',
	endDate: PLUS_TWO_MONTHS.toISOString(),
	isSoldOut: false,
	isTrashed: false,
	isDefault: false,
	isFree: false,
	isRequired: false,
	isTaxable: false,
	max: -1,
	min: 0,
	name: '',
	order: 0,
	price: null,
	prices: null,
	quantity: -1,
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
		let espressoTicket: any = {
			__typename: 'EspressoTicket',
		};
		let data: TicketItem, ticket: Ticket;
		switch (mutationType) {
			case MutationType.Create:
				espressoTicket = {
					...espressoTicket,
					...TICKET_DEFAULTS,
					...input,
					prices: null,
				};
				break;
			case MutationType.Delete:
				espressoTicket = {
					...espressoTicket,
					...input,
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
					...input,
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

import { pickBy } from 'ramda';
import { ExecutionResult } from 'graphql';

import { nodes as tickets } from '../../../queries/tickets/test/data';
import { edge as priceEdge } from '../../../queries/prices/test/data';
import { MutationInput, MutationType } from '../../../../../../../application/services/apollo/mutations/types';
import { ucFirst } from '../../../../../../../application/services/utilities/text/changeCase';
import { mutations } from '../..';
import { MockedResponse } from '../../../../context/TestContext/types';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

const prices = { ...priceEdge, __typename: 'EspressoTicketPricesConnectionEdge' };

export const mockedTickets = {
	[MutationType.Create]: { ...tickets[0], id: tickets[0].id + '-alpha' }, // make sure to change the ID to make it different}
	[MutationType.Update]: { ...tickets[0], prices },
	[MutationType.Delete]: tickets[0],
};

export const getMutationMocks = (
	mutationInput: MutationInput,
	mutationType: MutationType
): ReadonlyArray<MockedResponse> => {
	return [
		{
			request: getMockRequest(mutationInput, mutationType),
			result: getMockResult(mutationInput, mutationType),
		},
	];
};

export const getMockRequest = (mutationInput: MutationInput, mutationType: MutationType): ReadQueryOptions => {
	const input: MutationInput = {
		clientMutationId: `${mutationType}_TICKET`,
		...mutationInput,
	};
	if (mutationType !== MutationType.Create && !input.id) {
		input.id = mockedTickets[mutationType].id;
	}

	return {
		query: mutations[`${mutationType}_TICKET`],
		variables: {
			input,
		},
	};
};

export const getMockResult = (mutationInput: MutationInput, mutationType: MutationType): ExecutionResult => {
	// make sure that tickets don't go into the result
	const input = pickBy<MutationInput, MutationInput>(
		(_, key) => Object.keys(mockedTickets[mutationType]).includes(key),
		mutationInput
	);
	return {
		data: {
			// e.g. createEspressoTicket
			[`${mutationType.toLowerCase()}EspressoTicket`]: {
				// e.g. UpdateEspressoTicketPayload
				__typename: `${ucFirst(mutationType.toLowerCase())}EspressoTicketPayload`,
				espressoTicket:
					MutationType.Delete === mutationType
						? { ...mockedTickets[mutationType], ...input }
						: { ...mockedTickets[mutationType], ...input, prices },
			},
		},
	};
};

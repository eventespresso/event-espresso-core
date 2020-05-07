import { pickBy, omit } from 'ramda';
import { ExecutionResult } from 'graphql';

import { nodes as prices } from '../../../queries/prices/test/data';
import { MutationInput, MutationType } from '../../../../../../../application/services/apollo/mutations/types';
import { ucFirst } from '../../../../../../../application/services/utilities/text/changeCase';
import { mutations } from '../..';
import { MockedResponse } from '../../../../context/TestContext/types';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

export const mockedPrices = {
	[MutationType.Create]: { ...prices[0], id: prices[0].id + '-alpha' }, // make sure to change the ID to make it different}
	[MutationType.Update]: prices[0],
	[MutationType.Delete]: { id: prices[0].id, __typename: prices[0].__typename },
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
	let input: MutationInput = {
		clientMutationId: `${mutationType}_PRICE`,
		...mutationInput,
	};
	if (mutationType !== MutationType.Create && !input.id) {
		input.id = mockedPrices[mutationType].id;
	}

	// Avoid ticketId being part of the request
	input = omit<MutationInput, string>(['ticketId'], input);

	return {
		query: mutations[`${mutationType}_PRICE`],
		variables: {
			input,
		},
	};
};

export const getMockResult = (mutationInput: MutationInput, mutationType: MutationType): ExecutionResult => {
	// make sure that prices don't go into the result
	const input = pickBy<MutationInput, MutationInput>(
		(_, key) => Object.keys(mockedPrices[mutationType]).includes(key),
		mutationInput
	);
	return {
		data: {
			// e.g. createEspressoPrice
			[`${mutationType.toLowerCase()}EspressoPrice`]: {
				// e.g. UpdateEspressoPricePayload
				__typename: `${ucFirst(mutationType.toLowerCase())}EspressoPricePayload`,
				espressoPrice:
					MutationType.Delete === mutationType
						? mockedPrices[mutationType]
						: { ...mockedPrices[mutationType], ...input },
			},
		},
	};
};

import { nodes as datetimes } from '../../../queries/datetimes/test/data';
import { ReadQueryOptions } from '../../../queries/types';
import { MutationInput, MutationType } from '../../../../../../application/services/apollo/mutations/types';
import { ucFirst } from '../../../../../../application/utilities/text/changeCase';
import { eventId } from '../../../../context';
import { mutations } from '../../';

export const mockedDatetime = datetimes[0];

export const getMutationMocks = (mutationInput: MutationInput, mutationType: MutationType) => {
	return [
		{
			request: getMockRequest(mutationInput, mutationType),
			result: getMockResult(mutationInput, mutationType),
		},
	];
};

export const getMockRequest = (mutationInput: MutationInput, mutationType: MutationType): ReadQueryOptions => {
	const input: MutationInput = {
		clientMutationId: `${mutationType}_DATETIME`,
		...mutationInput,
	};
	if (mutationType === MutationType.Create) {
		input.eventId = eventId; // required for createDatetime
	}

	return {
		query: mutations[`${mutationType}_DATETIME`],
		variables: {
			input,
		},
	};
};

export const getMockResult = (mutationInput: MutationInput, mutationType: MutationType) => {
	return {
		data: {
			// e.g. createEspressoDatetime
			[`${mutationType.toLowerCase()}EspressoDatetime`]: {
				// e.g. UpdateEspressoDatetimePayload
				__typename: `${ucFirst(mutationType.toLowerCase())}EspressoDatetimePayload`,
				espressoDatetime: { ...mockedDatetime, ...mutationInput },
			},
		},
	};
};

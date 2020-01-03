import { pickBy } from 'ramda';
import { nodes as datetimes } from '../../../queries/datetimes/test/data';
import { ReadQueryOptions } from '../../../queries/types';
import { MutationInput, MutationType } from '../../../../../../application/services/apollo/mutations/types';
import { ucFirst } from '../../../../../../application/utilities/text/changeCase';
import { eventId } from '../../../../context';
import { mutations } from '../../';

export const mockedDatetime = { ...datetimes[0], id: datetimes[0].id + '-alpha' }; // make sure to change the ID to make it different

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
	// make sure that tickets don't go into the result
	const input = pickBy<MutationInput, MutationInput>(
		(_, key) => Object.keys(mockedDatetime).includes(key),
		mutationInput
	);
	return {
		data: {
			// e.g. createEspressoDatetime
			[`${mutationType.toLowerCase()}EspressoDatetime`]: {
				// e.g. UpdateEspressoDatetimePayload
				__typename: `${ucFirst(mutationType.toLowerCase())}EspressoDatetimePayload`,
				espressoDatetime: { ...mockedDatetime, ...input },
			},
		},
	};
};

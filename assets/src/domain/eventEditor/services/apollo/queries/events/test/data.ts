import { GraphQLError } from 'graphql';

import { Event } from '../../../types';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

export const request: ReadQueryOptions = null; // to be generated via Query Options hook

export const nodes: Event[] = [
	{
		id: 'xyz',
		dbId: 100,
		cacheId: '',
		description: 'Test',
		name: 'Hello',
		isActive: false,
		isCancelled: false,
		isExpired: false,
		isInactive: false,
		isPostponed: false,
		isSoldOut: false,
		isUpcoming: false,
		order: 0,
		shortDescription: 'short',
		__typename: 'EspressoEvent',
	},
];

export const data = {
	espressoEvent: nodes[0],
};

const errors = [new GraphQLError('Error!')];

export const successMocks = [
	{
		request,
		result: { data },
	},
];

export const errorMocks = [
	{
		// modify request to simulate error
		request: {
			...request,
			variables: {},
		},
		result: { errors },
		error: new Error('ERROR!'),
	},
];

import { GraphQLError } from 'graphql';

import '../../../../types';
import { Datetime, DatetimeEdge } from '../../../types';
import { ReadQueryOptions } from '../../types';

export const eventId: number = 100;

export const request: ReadQueryOptions = null; // to be generated via Query Options hook

export const setup = (): void => {
	window.eeEditorEventData = { eventId };
};

export const cleanup = (): void => {
	delete window.eeEditorEventData;
};

export const nodes: Datetime[] = [
	{
		id: 'xyz',
		dbId: 2,
		capacity: 40,
		name: 'Hello',
		description: 'Test',
		endDate: 'some',
		isActive: true,
		isExpired: false,
		isPrimary: false,
		isSoldOut: false,
		isUpcoming: false,
		length: null,
		order: 0,
		reserved: 0,
		sold: 6,
		startDate: 'end',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'abc',
		dbId: 3,
		capacity: 420,
		name: 'Hello World',
		description: 'Test Desc',
		endDate: 'some dat',
		isActive: false,
		isExpired: true,
		isPrimary: false,
		isSoldOut: false,
		isUpcoming: false,
		length: null,
		order: 0,
		reserved: 0,
		sold: 6,
		startDate: 'end data',
		__typename: 'EspressoDatetime',
	},
];

export const edge: DatetimeEdge = {
	nodes,
	__typename: 'EspressoRootQueryDatetimesConnection',
};

export const data = {
	espressoDatetimes: edge,
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

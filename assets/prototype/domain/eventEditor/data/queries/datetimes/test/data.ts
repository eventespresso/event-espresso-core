import { GraphQLError } from 'graphql';

import '../../../../types';
import { GET_DATETIMES } from '../';

const eventId = 100;

export const request = {
	query: GET_DATETIMES,
	variables: {
		where: {
			eventId,
		},
	},
};

export const setup = () => {
	window.eeEditorEventData = { eventId };
};

export const cleanup = () => {
	delete window.eeEditorEventData;
};

export const nodes = [
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

export const edge = {
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
		request,
		result: { errors },
	},
];

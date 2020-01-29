import { GraphQLError } from 'graphql';
import { formatISO } from 'date-fns';

import { Ticket, TicketEdge } from '../../../types';
import { ReadQueryOptions } from '../../types';

export const request: ReadQueryOptions = null; // to be generated via Query Options hook

export const nodes: Ticket[] = [
	{
		id: 'xyz',
		dbId: 1,
		description: 'some desc',
		endDate: formatISO(new Date(2019, 8, 18, 19, 0, 52)),
		isDefault: true,
		isFree: false,
		isRequired: false,
		isSoldOut: false,
		isTaxable: false,
		isTrashed: false,
		max: -1,
		min: 0,
		name: 'Ticket XYZ',
		order: 1,
		price: 20.5,
		quantity: 100,
		reserved: 0,
		reverseCalculate: true,
		sold: 5,
		startDate: 'The start date',
		uses: -1,
		__typename: 'EspressoTicket',
	},
	{
		id: 'abc',
		dbId: 3,
		description: 'some new desc',
		endDate: formatISO(new Date(2029, 8, 18, 19, 0, 52)),
		isDefault: true,
		isFree: false,
		isRequired: false,
		isSoldOut: false,
		isTaxable: false,
		isTrashed: false,
		max: -1,
		min: 0,
		name: 'Ticket ABC',
		order: 1,
		price: 10.5,
		quantity: -1,
		reserved: 0,
		reverseCalculate: false,
		sold: 0,
		startDate: 'start date',
		uses: -1,
		__typename: 'EspressoTicket',
	},
];

export const edge: TicketEdge = {
	nodes,
	__typename: 'EspressoRootQueryTicketsConnection',
};

export const data = {
	espressoTickets: edge,
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

import { GraphQLError } from 'graphql';
import { formatISO } from 'date-fns';

import { Ticket, TicketEdge } from '../../../types';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

export const request: ReadQueryOptions = null; // to be generated via Query Options hook

export const nodes: Ticket[] = [
	{
		id: 'xyz',
		dbId: 1,
		cacheId: '',
		description: 'some desc',
		endDate: formatISO(new Date(2019, 8, 18, 19, 0, 52)),
		isDefault: true,
		isExpired: true,
		isFree: false,
		isOnSale: false,
		isPending: false,
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
		registrationCount: 0,
		reserved: 0,
		reverseCalculate: false,
		sold: 5,
		startDate: formatISO(new Date(2018, 8, 18, 19, 0, 52)),
		uses: -1,
		__typename: 'EspressoTicket',
	},
	{
		id: 'abc',
		dbId: 3,
		cacheId: '',
		description: 'some new desc',
		endDate: formatISO(new Date(2039, 8, 18, 19, 0, 52)),
		isDefault: true,
		isExpired: false,
		isFree: false,
		isOnSale: false,
		isPending: true,
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
		registrationCount: 0,
		reserved: 0,
		reverseCalculate: false,
		sold: 0,
		startDate: formatISO(new Date(2038, 8, 18, 19, 0, 52)),
		uses: -1,
		__typename: 'EspressoTicket',
	},
	{
		id: 'def',
		dbId: 3,
		cacheId: '',
		description: 'some new desc',
		endDate: formatISO(new Date(2029, 8, 18, 19, 0, 52)),
		isDefault: true,
		isExpired: false,
		isFree: false,
		isOnSale: false,
		isPending: true,
		isRequired: false,
		isTaxable: false,
		isSoldOut: false,
		isTrashed: false,
		max: -1,
		min: 0,
		name: 'Ticket DEF',
		order: 1,
		price: 10.5,
		quantity: -1,
		registrationCount: 0,
		reserved: 0,
		reverseCalculate: false,
		sold: 0,
		startDate: formatISO(new Date(2028, 8, 18, 19, 0, 52)),
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

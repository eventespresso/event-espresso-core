import { GraphQLError } from 'graphql';

import { Price, PriceEdge } from '../../../types';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

export const request: ReadQueryOptions = null; // to be generated via Query Options hook

export const nodes: Price[] = [
	{
		id: 'price-xyz',
		dbId: 1,
		amount: 40,
		cacheId: '',
		description: 'some desc',
		isBasePrice: true,
		isDefault: false,
		isDiscount: false,
		isPercent: false,
		isTax: false,
		isTrashed: false,
		name: 'Price XYZ',
		order: 1,
		overrides: null,
		__typename: 'EspressoPrice',
	},
	{
		id: 'price-abc',
		dbId: 3,
		amount: 4.8,
		cacheId: '',
		description: 'some new desc',
		isBasePrice: false,
		isDefault: true,
		isDiscount: false,
		isPercent: true,
		isTax: false,
		isTrashed: false,
		name: 'Price ABC',
		order: 2,
		overrides: null,
		__typename: 'EspressoPrice',
	},
	{
		id: 'price-pqr',
		dbId: 4,
		amount: 10,
		cacheId: '',
		description: 'PQR desc',
		isBasePrice: false,
		isDefault: false,
		isDiscount: true,
		isPercent: true,
		isTax: false,
		isTrashed: false,
		name: 'Price PQR',
		order: 3,
		overrides: null,
		__typename: 'EspressoPrice',
	},
];

export const edge: PriceEdge = {
	nodes,
	__typename: 'EspressoRootQueryPricesConnection',
};

export const data = {
	espressoPrices: edge,
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

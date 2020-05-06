import { GraphQLError } from 'graphql';

import { PriceType, PriceTypeEdge, PriceBasetype } from '../../../types';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

export const request: ReadQueryOptions = null; // to be generated via Query Options hook

export const nodes: PriceType[] = [
	{
		id: 'xyz',
		dbId: 1,
		cacheId: '',
		baseType: PriceBasetype.BASE_PRICE,
		isBasePrice: true,
		isDiscount: false,
		isPercent: false,
		isTax: false,
		isTrashed: false,
		name: 'PriceType XYZ',
		order: 1,
		__typename: 'EspressoPriceType',
	},
	{
		id: 'abc',
		dbId: 3,
		cacheId: '',
		baseType: PriceBasetype.SURCHARGE,
		isBasePrice: false,
		isDiscount: false,
		isPercent: false,
		isTax: false,
		isTrashed: false,
		name: 'PriceType ABC',
		order: 2,
		__typename: 'EspressoPriceType',
	},
	{
		id: 'pqr',
		dbId: 4,
		cacheId: '',
		baseType: PriceBasetype.DISCOUNT,
		isBasePrice: false,
		isDiscount: true,
		isPercent: true,
		isTax: false,
		isTrashed: false,
		name: 'PriceType PQR',
		order: 3,
		__typename: 'EspressoPriceType',
	},
	{
		id: 'def',
		dbId: 5,
		cacheId: '',
		baseType: PriceBasetype.TAX,
		isBasePrice: false,
		isDiscount: false,
		isPercent: true,
		isTax: true,
		isTrashed: false,
		name: 'PriceType DEF',
		order: 4,
		__typename: 'EspressoPriceType',
	},
];

export const edge: PriceTypeEdge = {
	nodes,
	__typename: 'EspressoRootQueryPriceTypesConnection',
};

export const data = {
	espressoPriceTypes: edge,
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

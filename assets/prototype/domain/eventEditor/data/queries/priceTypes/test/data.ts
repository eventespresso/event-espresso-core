import { GraphQLError } from 'graphql';

import { PriceType, PriceTypeEdge, PriceBasetype } from '../../../types';
import { ReadQueryOptions } from '../../types';

export const request: ReadQueryOptions = null; // to be generated via Query Options hook

export const nodes: PriceType[] = [
	{
		id: 'xyz',
		dbId: 1,
		baseType: PriceBasetype.BASE_PRICE,
		isBasePrice: true,
		isDeleted: false,
		isDiscount: false,
		isPercent: false,
		isTax: false,
		name: 'PriceType XYZ',
		order: 1,
		__typename: 'EspressoPriceType',
	},
	{
		id: 'abc',
		dbId: 3,
		baseType: PriceBasetype.SURCHARGE,
		isBasePrice: false,
		isDeleted: false,
		isDiscount: false,
		isPercent: true,
		isTax: false,
		name: 'PriceType ABC',
		order: 2,
		__typename: 'EspressoPriceType',
	},
	{
		id: 'pqr',
		dbId: 4,
		baseType: PriceBasetype.DISCOUNT,
		isBasePrice: false,
		isDeleted: false,
		isDiscount: true,
		isPercent: true,
		isTax: false,
		name: 'PriceType PQR',
		order: 3,
		__typename: 'EspressoPriceType',
	},
	{
		id: 'def',
		dbId: 5,
		baseType: PriceBasetype.TAX,
		isBasePrice: false,
		isDeleted: false,
		isDiscount: false,
		isPercent: true,
		isTax: true,
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

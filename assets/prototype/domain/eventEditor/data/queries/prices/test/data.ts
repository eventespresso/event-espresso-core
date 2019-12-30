import { GraphQLError } from 'graphql';

import '../../../../types';
import { Price, PriceEdge } from '../../../types';
import { ReadQueryOptions } from '../../types';

export const eventId: number = 100;

export const request: ReadQueryOptions = null; // to be generated via Query Options hook

export const setup = (): void => {
	window.eeEditorEventData = { eventId };
};

export const cleanup = (): void => {
	delete window.eeEditorEventData;
};

export const nodes: Price[] = [
	{
		id: 'xyz',
		dbId: 1,
		amount: 40,
		desc: 'some desc',
		isBasePrice: true,
		isDefault: false,
		isDeleted: false,
		isDiscount: false,
		isPercent: false,
		isTax: false,
		name: 'Price XYZ',
		order: 1,
		overrides: null,
		priceTypeOrder: null,
		__typename: 'EspressoPrice',
	},
	{
		id: 'abc',
		dbId: 3,
		amount: 4.8,
		desc: 'some new desc',
		isBasePrice: false,
		isDefault: true,
		isDeleted: false,
		isDiscount: false,
		isPercent: true,
		isTax: false,
		name: 'Price ABC',
		order: 2,
		overrides: null,
		priceTypeOrder: null,
		__typename: 'EspressoPrice',
	},
	{
		id: 'pqr',
		dbId: 4,
		amount: 97,
		desc: 'PQR desc',
		isBasePrice: false,
		isDefault: false,
		isDeleted: false,
		isDiscount: true,
		isPercent: true,
		isTax: false,
		name: 'Price PQR',
		order: 3,
		overrides: null,
		priceTypeOrder: null,
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

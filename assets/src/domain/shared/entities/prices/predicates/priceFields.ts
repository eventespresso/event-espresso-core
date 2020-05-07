import { UpdatePriceInput } from '@edtrServices/apollo/mutations';

export const PRICE_INPUT_FIELDS: Array<keyof UpdatePriceInput> = [
	'amount',
	'description',
	'isDefault',
	'isTrashed',
	'name',
	'order',
	'overrides',
	'parent',
	'priceType',
	'wpUser',
];

export const PRICE_FIELDS = [
	...PRICE_INPUT_FIELDS,
	'id',
	'dbId',
	'cacheId',
	'isBasePrice',
	'isDiscount',
	'isPercent',
	'isTax',
];

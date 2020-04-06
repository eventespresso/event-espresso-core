import { UpdateTicketInput } from '@edtrServices/apollo/mutations';

export const TICKET_INPUT_FIELDS: Array<keyof UpdateTicketInput> = [
	'datetimes',
	'description',
	'endDate',
	'isDefault',
	'isRequired',
	'isTaxable',
	'isTrashed',
	'max',
	'min',
	'name',
	'order',
	'parent',
	'price',
	'prices',
	'quantity',
	'reserved',
	'reverseCalculate',
	'sold',
	'startDate',
	'uses',
	'wpUser',
];

const outputOnlyFields = [
	'cacheId',
	'dbId',
	'id',
	'isExpired',
	'isFree',
	'isOnSale',
	'isPending',
	'isSoldOut',
	'registrationCount',
];

export const TICKET_FIELDS = [...TICKET_INPUT_FIELDS, ...outputOnlyFields];

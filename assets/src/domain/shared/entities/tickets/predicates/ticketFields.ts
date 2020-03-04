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
	'row',
	'sold',
	'startDate',
	'uses',
	'wpUser',
];

export const TICKET_FIELDS = [...TICKET_INPUT_FIELDS, 'id', 'dbId', 'isSoldOut'];

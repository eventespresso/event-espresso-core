import { Ticket } from '@edtrServices/apollo/types';

// 'name' is only required for modal title
export const TICKET_FIELDS_TO_USE: Array<keyof Partial<Ticket>> = [
	'id',
	'isTaxable',
	'name',
	'price',
	'reverseCalculate',
];

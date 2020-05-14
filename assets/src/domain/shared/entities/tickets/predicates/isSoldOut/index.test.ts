import isSoldOut from './index';
import { nodes as tickets } from '../../../../../eventEditor/services/apollo/queries/tickets/test/data';

const testCases = [
	{
		desc: 'returns true when ticket.isSoldOut is true BUT sold is less than quantity',
		sold: 5,
		quantity: 10,
		soldOut: true,
		result: true,
	},
	{
		desc: 'returns true when ticket.isSoldOut is true AND sold is equal to quantity',
		sold: 10,
		quantity: 10,
		soldOut: true,
		result: true,
	},
	{
		desc: 'returns true when ticket.isSoldOut is true AND sold is greater than quantity',
		sold: 10,
		quantity: 5,
		soldOut: true,
		result: true,
	},
	{
		desc: 'returns true when ticket.isSoldOut is true BUT quantity is infinite',
		sold: 10,
		quantity: -1,
		soldOut: true,
		result: true,
	},
	{
		desc: 'returns false when ticket.isSoldOut is false AND sold is less than quantity',
		sold: 5,
		quantity: 10,
		soldOut: true,
		result: true,
	},
	{
		desc: 'returns true when ticket.isSoldOut is false BUT sold is equal to quantity',
		sold: 10,
		quantity: 10,
		soldOut: false,
		result: true,
	},
	{
		desc: 'returns true when ticket.isSoldOut is false BUT sold is greater than quantity',
		sold: 10,
		quantity: 5,
		soldOut: true,
		result: true,
	},
	{
		desc: 'returns true when ticket.isSoldOut is false BUT quantity is infinite',
		sold: 10,
		quantity: -1,
		soldOut: true,
		result: true,
	},
];

describe('isSoldOut', () => {
	tickets.forEach((ticket) => {
		testCases.forEach(({ desc, quantity, sold, soldOut, result }) => {
			const newTicket = {
				...ticket,
				isSoldOut: soldOut,
				quantity,
				sold,
			};
			it(desc, () => {
				expect(isSoldOut(newTicket)).toBe(result);
			});
		});
	});
});

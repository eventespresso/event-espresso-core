import percentSoldBelow from './index';
import { nodes as tickets } from '../../../../../../eventEditor/services/apollo/queries/tickets/test/data';

const ticket = tickets[0];

describe('percentSoldBelow', () => {
	test('Should return empty array if tickets has invalid finite and infinite quantity', () => {
		const filteredTickets = percentSoldBelow({
			percentage: 10,
			tickets: [
				{
					...ticket,
					id: '1',
					quantity: 0,
				},
				{
					...ticket,
					id: '2',
					quantity: -1,
				},
				{
					...ticket,
					id: '3',
					quantity: -2,
				},
			],
		});

		expect(filteredTickets.length).toBe(0);
	});

	test('Should return items with infinite quantity', () => {
		const filteredTickets = percentSoldBelow({
			percentage: 10,
			tickets: [
				{
					...ticket,
					id: '1',
					quantity: -1,
				},
				{
					...ticket,
					id: '2',
					quantity: 0,
				},
				{
					...ticket,
					id: '3',
					quantity: Infinity,
				},
			],
		});

		expect(filteredTickets.length).toBe(1);
		expect(filteredTickets[0].quantity).toBe(Infinity);
	});

	test('Should filter out tickets based on below50Sold show type', () => {
		const filteredTickets = percentSoldBelow({
			percentage: 50,
			tickets: [
				{
					...ticket,
					id: '1',
					quantity: 10,
					sold: 5,
				},
				{
					...ticket,
					id: '2',
					quantity: 100,
					sold: 49,
				},
				{
					...ticket,
					id: '3',
					quantity: 100,
					sold: 50,
				},
			],
		});

		expect(filteredTickets.length).toBe(1);
		expect(filteredTickets[0].id).toBe('2');
		expect(filteredTickets[0].quantity).toBe(100);
		expect(filteredTickets[0].sold).toBe(49);
	});
});

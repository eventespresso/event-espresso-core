/**
 * Internal dependencies
 */
import percentSoldBelow from './index';

describe('percentSoldBelow', () => {
	test('Should return empty array if tickets has invalid finite and infinite quantity', () => {
		const filteredTickets = percentSoldBelow({
			percentage: 10,
			tickets: [
				{
					id: '1',
					quantity: 0,
				},
				{
					id: '2',
					quantity: -1,
				},
				{
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
					id: '1',
					quantity: -1,
				},
				{
					id: '2',
					quantity: 0,
				},
				{
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
					id: '1',
					quantity: 10,
					sold: 5,
				},
				{
					id: '2',
					quantity: 100,
					sold: 49,
				},
				{
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

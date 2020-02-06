import percentSoldAtOrAbove from './index';
import { nodes as tickets } from '../../../../../../eventEditor/services/apollo/queries/tickets/test/data';

const ticket = tickets[0];

describe('percentSoldAtOrAbove', () => {
	it('should return empty array if tickets has invalid finite quantity', () => {
		const filteredTickets = percentSoldAtOrAbove({
			percentage: 10,
			tickets: [
				{
					...ticket,
					id: '1',
					quantity: Infinity,
				},
				{
					...ticket,
					id: '2',
					quantity: 0,
				},
			],
		});

		expect(filteredTickets.length).toBe(0);
	});

	it('should return empty array if quantity is zero', () => {
		const updatedTickets = tickets.map((ticket) => {
			return { ...ticket, quantity: 0 };
		});
		const filteredTickets = percentSoldAtOrAbove({ percentage: 50, tickets: updatedTickets });
		expect(filteredTickets).toEqual([]);
	});

	it('should filter out tickets based on above50Sold show type', () => {
		const filteredTickets = percentSoldAtOrAbove({
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

		expect(filteredTickets.length).toBe(2);
		expect(filteredTickets[0].id).toBe('1');
		expect(filteredTickets[1].id).toBe('3');
	});

	it('should filter out tickets based on above75Sold show type', () => {
		const filteredTickets = percentSoldAtOrAbove({
			percentage: 75,
			tickets: [
				{
					...ticket,
					id: '1',
					quantity: 10,
					sold: 8,
				},
				{
					...ticket,
					id: '2',
					quantity: 100,
					sold: 74,
				},
				{
					...ticket,
					id: '3',
					quantity: 100,
					sold: 75,
				},
				{
					...ticket,
					id: '4',
					quantity: 100,
					sold: 76,
				},
			],
		});

		expect(filteredTickets.length).toBe(3);
		expect(filteredTickets[0].id).toBe('1');
		expect(filteredTickets[1].id).toBe('3');
		expect(filteredTickets[2].id).toBe('4');
	});

	it('should filter out tickets based on above90Sold show type', () => {
		const filteredTickets = percentSoldAtOrAbove({
			percentage: 90,
			tickets: [
				{
					...ticket,
					id: '1',
					quantity: 100,
					sold: 89,
				},
				{
					...ticket,
					id: '2',
					quantity: 10,
					sold: 9,
				},
				{
					...ticket,
					id: '3',
					quantity: 1000,
					sold: 899,
				},
				{
					...ticket,
					id: '4',
					quantity: 1000,
					sold: 900,
				},
			],
		});

		expect(filteredTickets.length).toBe(2);
		expect(filteredTickets[0].id).toBe('2');
		expect(filteredTickets[1].id).toBe('4');
	});
});

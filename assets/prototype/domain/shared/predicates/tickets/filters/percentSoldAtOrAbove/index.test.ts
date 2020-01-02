/**
 * Internal dependencies
 */
import percentSoldAtOrAbove from './index';

test('Should return empty array if tickets has invalid finite quantity', () => {
	const filteredTickets = percentSoldAtOrAbove({
		maxQuantity: 10,
		tickets: [
			{
				id: '1',
				quantity: Infinity,
			},
			{
				id: '2',
				quantity: 0,
			},
		],
	});

	expect(filteredTickets.length).toBe(0);
});

test('Should filter out tickets based on above50Sold show type', () => {
	const filteredTickets = percentSoldAtOrAbove({
		maxQuantity: 50,
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

	expect(filteredTickets.length).toBe(2);
	expect(filteredTickets[0].id).toBe('1');
	expect(filteredTickets[1].id).toBe('3');
});

test('Should filter out tickets based on above75Sold show type', () => {
	const filteredTickets = percentSoldAtOrAbove({
		maxQuantity: 75,
		tickets: [
			{
				id: '1',
				quantity: 10,
				sold: 8,
			},
			{
				id: '2',
				quantity: 100,
				sold: 74,
			},
			{
				id: '3',
				quantity: 100,
				sold: 75,
			},
			{
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

test('Should filter out tickets based on above75Sold show type', () => {
	const filteredTickets = percentSoldAtOrAbove({
		maxQuantity: 75,
		tickets: [
			{
				id: '1',
				quantity: 10,
				sold: 8,
			},
			{
				id: '2',
				quantity: 100,
				sold: 74,
			},
			{
				id: '3',
				quantity: 100,
				sold: 75,
			},
			{
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

test('Should filter out tickets based on above90Sold show type', () => {
	const filteredTickets = percentSoldAtOrAbove({
		maxQuantity: 90,
		tickets: [
			{
				id: '1',
				quantity: 100,
				sold: 89,
			},
			{
				id: '2',
				quantity: 10,
				sold: 9,
			},
			{
				id: '3',
				quantity: 1000,
				sold: 899,
			},
			{
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

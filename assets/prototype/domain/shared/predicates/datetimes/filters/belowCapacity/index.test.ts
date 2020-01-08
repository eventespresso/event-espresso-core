/**
 * Internal dependencies
 */
import belowCapacity from './index';

describe('belowCapacity', () => {
	it('Should return empty array if dates are deleted', () => {
		const filteredDates = belowCapacity({
			capacity: 50,
			dates: [
				{ id: 'abc', isDeleted: true },
				{ id: 'def', isDeleted: true },
			],
		});

		expect(filteredDates).toEqual([]);
	});

	test('Should pass all dates with infinite capacity', () => {
		const filteredDates = belowCapacity({
			capacity: 50,
			dates: [
				{ capacity: Infinity, id: 'abc', isDeleted: false },
				{ capacity: Infinity, id: 'def', isDeleted: false },
				{ capacity: Infinity, id: 'xyz', isDeleted: false },
			],
		});

		expect(filteredDates.length).toBe(3);
	});

	test('Should pass all dates with finite capacity', () => {
		const filteredDates = belowCapacity({
			capacity: 50,
			dates: [
				{ capacity: 100, id: 'abc', isDeleted: false, sold: 10 },
				{ capacity: 11, id: 'def', isDeleted: false, sold: 6 },
				{ capacity: 13, id: 'xyz', isDeleted: false, sold: 6 },
			],
		});

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('abc');
		expect(filteredDates[1].id).toBe('xyz');
	});
});

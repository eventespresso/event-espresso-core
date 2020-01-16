/**
 * Internal dependencies
 */
import belowCapacity from './index';
import { nodes as datetimes } from '../../../../../eventEditor/data/queries/datetimes/test/data';

const datetime = datetimes[0];

describe('belowCapacity', () => {
	it('Should return empty array if dates are deleted', () => {
		const filteredDates = belowCapacity({
			capacity: 50,
			dates: [
				{ ...datetime, id: 'abc', isDeleted: true },
				{ ...datetime, id: 'def', isDeleted: true },
			],
		});

		expect(filteredDates).toEqual([]);
	});

	test('Should pass all dates with infinite capacity', () => {
		const filteredDates = belowCapacity({
			capacity: 50,
			dates: [
				{ ...datetime, capacity: Infinity, id: 'abc', isDeleted: false },
				{ ...datetime, capacity: Infinity, id: 'def', isDeleted: false },
				{ ...datetime, capacity: Infinity, id: 'xyz', isDeleted: false },
			],
		});

		expect(filteredDates.length).toBe(3);
	});

	test('Should pass all dates with finite capacity', () => {
		const filteredDates = belowCapacity({
			capacity: 50,
			dates: [
				{ ...datetime, capacity: 100, id: 'abc', isDeleted: false, sold: 10 },
				{ ...datetime, capacity: 11, id: 'def', isDeleted: false, sold: 6 },
				{ ...datetime, capacity: 13, id: 'xyz', isDeleted: false, sold: 6 },
			],
		});

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('abc');
		expect(filteredDates[1].id).toBe('xyz');
	});
});

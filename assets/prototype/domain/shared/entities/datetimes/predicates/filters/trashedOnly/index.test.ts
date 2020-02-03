/**
 * Internal dependencies
 */
import trashedOnly from './index';
import { nodes as datetimes } from '../../../../../../eventEditor/data/queries/datetimes/test/data';

const datetime = datetimes[0];

describe('trashedOnly', () => {
	it('Should return empty array if dates are not active, nor upcoming', () => {
		const filteredDates = trashedOnly([
			{ ...datetime, id: 'abc' },
			{ ...datetime, id: 'def', isDeleted: false },
			{ ...datetime, id: 'xyz', isDeleted: false },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of trashedOnly dates', () => {
		const filteredDates = trashedOnly([
			{ ...datetime, id: 'abc', isDeleted: true },
			{ ...datetime, id: 'def', isDeleted: false },
			{ ...datetime, id: 'xyz', isDeleted: true },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('abc');
		expect(filteredDates[1].id).toBe('xyz');
	});
});

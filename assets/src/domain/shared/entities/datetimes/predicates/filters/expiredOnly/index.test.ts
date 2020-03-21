/**
 * Internal dependencies
 */
import expiredOnly from './index';
import { nodes as datetimes } from '../../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

const datetime = datetimes[0];

describe('expiredOnly', () => {
	it('Should return empty array if dates are not expired', () => {
		const filteredDates = expiredOnly([
			{ ...datetime, id: 'abc', isExpired: false },
			{ ...datetime, id: 'def', isExpired: false },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of dates that are expired', () => {
		const filteredDates = expiredOnly([
			{ ...datetime, id: 'abc', isExpired: false },
			{ ...datetime, id: 'def', isExpired: false },
			{ ...datetime, id: 'xyz', isExpired: true },
		]);

		expect(filteredDates.length).toBe(1);
		expect(filteredDates[0].id).toBe('xyz');
	});

	it('Should return an array of 2 dates that are expired', () => {
		const filteredDates = expiredOnly([
			{ ...datetime, id: 'abc', isExpired: false },
			{ ...datetime, id: 'def', isExpired: true },
			{ ...datetime, id: 'xyz', isExpired: true },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('def');
	});
});

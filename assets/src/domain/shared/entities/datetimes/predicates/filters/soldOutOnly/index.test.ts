/**
 * Internal dependencies
 */
import soldOutOnly from './index';
import { DatetimeStatus } from '../../../../../../eventEditor/services/apollo/types';
import { nodes as datetimes } from '../../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

const datetime = datetimes[0];

describe('soldOutOnly', () => {
	it('Should return empty array if dates are not active, nor upcoming', () => {
		const filteredDates = soldOutOnly([
			{ ...datetime, id: 'abc', isTrashed: true },
			{ ...datetime, id: 'def', isSoldOut: false },
			{ ...datetime, id: 'def', status: DatetimeStatus.active },
		]);

		expect(filteredDates).toEqual([]);
	});

	it('Should return an array of soldOutOnly dates when isSoldOut is true and have a valid status', () => {
		const filteredDates = soldOutOnly([
			{ ...datetime, id: 'abc', isActive: false },
			{ ...datetime, id: 'def', isSoldOut: true, status: DatetimeStatus.soldOut },
			{ ...datetime, id: 'xyz', isSoldOut: true, status: DatetimeStatus.soldOut },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('def');
		expect(filteredDates[1].id).toBe('xyz');
	});

	it('Should return an array of soldOutOnly dates when capacity is equal to amount sold', () => {
		const filteredDates = soldOutOnly([
			{ ...datetime, id: 'abc', capacity: 2, sold: 2 },
			{ ...datetime, id: 'def', capacity: 20, sold: 10 },
			{ ...datetime, id: 'xyz', capacity: 100, sold: 100 },
		]);

		expect(filteredDates.length).toBe(2);
		expect(filteredDates[0].id).toBe('abc');
		expect(filteredDates[1].id).toBe('xyz');
	});
});

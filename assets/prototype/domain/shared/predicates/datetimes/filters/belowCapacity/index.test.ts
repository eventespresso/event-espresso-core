/**
 * Internal dependencies
 */
import belowCapacity from './index';
import dates from '../tests/data';

describe.only('belowCapacity', () => {
	test('Should filter out dates based on below50Capacity show type', () => {
		const filteredDates = belowCapacity({ capacity: 50, dates });

		expect(filteredDates.length).toBe(0);
	});
});

import { omit } from 'ramda';

import capacityAtOrAbove from './index';
import { nodes as datetimes } from '../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

describe('capacityAtOrAbove', () => {
	it('should return false if datetime has missing sold property', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = omit(['sold'], datetime);
			const result = capacityAtOrAbove(newDatetime, 100);
			expect(result).toBe(false);
		});
	});

	it('should return false if datetime has invalid finite capacityLimit', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = omit(['capacity'], datetime);
			const result = capacityAtOrAbove(newDatetime, 100);
			expect(result).toBe(false);
		});

		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, capacity: Infinity };
			const result = capacityAtOrAbove(newDatetime, 100);
			expect(result).toBe(false);
		});

		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, capacity: null };
			const result = capacityAtOrAbove(newDatetime, 100);
			expect(result).toBe(false);
		});
	});

	it('should return false if capacity is below the expected values', () => {
		const capacityToCompare = [16, 11, 11];

		datetimes.forEach((datetime, index) => {
			const result = capacityAtOrAbove(datetime, capacityToCompare[index]);
			expect(result).toBe(false);
		});
	});

	it('should return true if capacity is at the same level as the expected one', () => {
		const capacityToCompare = [15, 1, 10];

		datetimes.forEach((datetime, index) => {
			const result = capacityAtOrAbove(datetime, capacityToCompare[index]);
			expect(result).toBe(true);
		});
	});

	it('should return true if capacity is above the expected one', () => {
		const capacityToCompare = [14, 10, 9];

		datetimes.forEach((datetime, index) => {
			const result = capacityAtOrAbove(datetime, capacityToCompare[index]);
			expect(result).toBe(true);
		});
	});
});

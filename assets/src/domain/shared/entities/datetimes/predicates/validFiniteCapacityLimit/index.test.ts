import { omit } from 'ramda';

import validFiniteCapacityLimit from './index';
import { nodes as datetimes } from '../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

describe('validFiniteCapacityLimit', () => {
	it('should return false if datetime has missing capacity property', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = omit(['capacity'], datetime);
			const result = validFiniteCapacityLimit(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if datetime capacity property is null', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, capacity: null };
			const result = validFiniteCapacityLimit(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if datetime capacity property is undefined', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, capacity: undefined };
			const result = validFiniteCapacityLimit(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if datetime capacity property is a string', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, capacity: 'bla bla' };
			const result = validFiniteCapacityLimit(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if datetime capacity property is Infinity', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, capacity: Infinity };
			const result = validFiniteCapacityLimit(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return true if capacity is number', () => {
		const capacityToCompare = [0, 10, 1000];

		datetimes.forEach((datetime, index) => {
			const newDatetime: any = { ...datetime, capacity: capacityToCompare[index] };
			const result = validFiniteCapacityLimit(newDatetime);
			expect(result).toBe(true);
		});
	});
});

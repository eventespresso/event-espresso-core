import { omit } from 'ramda';

import validSold from './index';
import { nodes as datetimes } from '../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

describe('validSold', () => {
	it('should return false if datetime has missing sold property', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = omit(['sold'], datetime);
			const result = validSold(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if datetime capacity property is null', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, sold: null };
			const result = validSold(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if datetime capacity property is undefined', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, sold: undefined };
			const result = validSold(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return true if capacity is number', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, sold: 100 };
			const result = validSold(newDatetime);
			expect(result).toBe(true);
		});
	});
});

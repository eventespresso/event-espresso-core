import { omit } from 'ramda';

import isTrashed from './index';
import { nodes as datetimes } from '../../../../../eventEditor/data/queries/datetimes/test/data';

describe('isTrashed', () => {
	it('should return false if isDeleted prop is not boolean', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = omit(['isDeleted'], datetime);
			const result = isTrashed(newDatetime);
			expect(result).toBe(false);
		});

		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, isDeleted: null };
			const result = isTrashed(newDatetime);
			expect(result).toBe(false);
		});

		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, isDeleted: undefined };
			const result = isTrashed(newDatetime);
			expect(result).toBe(false);
		});
	});

	it(`should return false if isDeleted prop is boolean and it's value is false`, () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, isDeleted: false };
			const result = isTrashed(newDatetime);
			expect(result).toBe(false);
		});
	});

	it(`should return true if isDeleted prop is boolean and it's value is true`, () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, isDeleted: true };
			const result = isTrashed(newDatetime);
			expect(result).toBe(true);
		});
	});
});
